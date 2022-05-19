import "dotenv/config";
import express from "express";
import wss from "express-ws";
import cors from "cors";
import authRoute from "./routes/auth.js";
import postRoute from "./routes/post.js"
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());
app.use("/api", authRoute);
app.use("/api", postRoute);

async function stratApp() {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    app.listen(PORT, () => console.log(`SERVER START${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

stratApp();
