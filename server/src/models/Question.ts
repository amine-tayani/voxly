import mongoose from "mongoose";

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  title: String,
  content: String,
  location: String,
  createdAt: { type: Date, default: Date.now() },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Answer" }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
});

const QuestionModel = mongoose.model("Question", QuestionSchema);

export default QuestionModel;
