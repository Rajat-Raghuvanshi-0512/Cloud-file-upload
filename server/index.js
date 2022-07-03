import app from "./app.mjs";
import dotenv from "dotenv"
import connectToDB from "./DB/connection.mjs"

if (process.env.NODE_ENV != "PRODUCTION") {
    dotenv.config({ path: "./server/Config/config.env" })
}
const PORT = process.env.PORT || 4000;

connectToDB()

app.get("/", (req, res) => {
    res.send("Hi")
})

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT} 💕`))