import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: {
        type: String, 
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;