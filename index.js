import "dotenv/config";
import express from "express";
import wss from "express-ws";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

app.listen(PORT, ()=>console.log(`SERVER START${PORT}`));