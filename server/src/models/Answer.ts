import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  content: String,
  createdAt: { type: Date, default: Date.now() },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
});

const AnswerModel = mongoose.model("Answer", AnswerSchema);

export default AnswerModel;
