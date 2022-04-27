import { Schema, model, ObjectId } from "mongoose";

const CommentSchema = new Schema({
  text: { type: String, required: true },
  post: { type: ObjectId, ref: "Post", required: true },
  user: { type: ObjectId, ref: "User", required: true },
});

const Comment = model("Comment", CommentSchema);
export default Comment;
