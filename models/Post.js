import { Schema, model, ObjectId } from "mongoose";

const PostSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  photoUrl: { type: String, required: true },
  text: { type: String, required: true },
  views: { type: Number, default: 0 },
  user: { type: ObjectId, ref: "User" },
});

const Post = model("Post", PostSchema);
export default Post;
