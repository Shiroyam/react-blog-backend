import { Schema, model } from "mongoose";

const UserScema = new Schema({
  fullName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String },
});

const User = model("User", UserScema);
export default User;
