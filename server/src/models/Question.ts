import mongoose from "mongoose";

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  title: String,
  content: String,
  createdAt: { type: Date, default: Date.now() },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Answer" }],
  location: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number], required: true },
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

QuestionSchema.index({ location: "2dsphere" });

const Question = mongoose.model("Question", QuestionSchema);

export default Question;
