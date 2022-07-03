import mongoose from "mongoose";
import bcrypt from "bcrypt"
const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    downloads: {
        type: Number,
        default: 0
    },
    password: String
});

fileSchema.pre("save", async function (next) {
    if (this.password) {
        try {
            if (!this.isModified("password")) {
                next();
            }
            this.password = await bcrypt.hash(this.password, 10);
        } catch (err) {
            console.log(err);
        }
    }
})

fileSchema.methods.matchPassword = async function (pass) {
    if (this.password) {
        try {
            return await bcrypt.compare(pass, this.password)
        } catch (err) {
            console.log(err);
        }
    }
}

export default mongoose.model("File", fileSchema);