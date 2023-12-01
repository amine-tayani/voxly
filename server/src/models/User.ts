import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Answer" }],
  likedQuestions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
});

const User = mongoose.model("User", UserSchema);

export default User;
