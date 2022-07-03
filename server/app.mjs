import express from "express"
import dotenv from "dotenv"
import multer from "multer"
import File from "./DB/Schemas/fileSchema.mjs"
import * as path from "path"
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = express()
const upload = multer({ dest: "uploads" })

if (process.env.NODE_ENV != "PRODUCTION") {
    dotenv.config({ path: "./server/Config/config.env" })
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const uploadFile = async (req, res) => {
    try {
        const fileData = {
            name: req.file.originalname,
            path: req.file.path,
        }
        if (req.body.password) {
            fileData.password = req.body.password
        }
        const file = await File.create(fileData)

        // For development 
        // const fileLink = `http://localhost:3000/file/${file.id}`

        //For Production
        const fileLink = `${req.protocol}://${req.headers.host}/file/${file.id}`
        res.status(200).json({
            message: "File uploaded successfully",
            fileLink
        })
    } catch (error) {
        console.log(error.message);
    }
}

const downloadFile = async (req, res) => {
    try {
        const { id } = req.params
        const file = await File.findById(id)
        if (!file) {
            return res.status(404).json({
                message: "File not found"
            })
        }
        if (file.password) {
            if (req.body.password == null) {
                return res.status(401).json({ message: "Please prove a password" })
            }
            if (!(await file.matchPassword(req.body.password))) {
                return res.status(400).json({ message: "Incorrect password" })
            }
        }
        file.downloads += 1
        await file.save()
        res.setHeader("name", file.name)
        res.download(file.path, file.name)
    } catch (error) {
        console.log(error.message);
    }
}

app.use(express.static(path.join(__dirname, "../client/build")))

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"))
})

app.route("/upload").post(upload.single("file"), uploadFile)
app.route("/download/:id").get(downloadFile).post(downloadFile)

export default app;