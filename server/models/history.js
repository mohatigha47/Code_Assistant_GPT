import mongoose from "mongoose";
const Schema = mongoose.Schema;

const historySchema = new Schema({
    user: {
        type: String,
        ref:'User',
        required: true
    },
    lang: {
        type: String,
        required: true
    },
    pseudoCode: {
        type: String,
        required: true
    },
    generatedCode:{
        type: String,
        required: true
    }
}, { timestamps: true });

const History = mongoose.model("History", historySchema);

export default History;