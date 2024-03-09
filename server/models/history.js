import mongoose from "mongoose";
const Schema = mongoose.Schema;

const historySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref:'User',
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