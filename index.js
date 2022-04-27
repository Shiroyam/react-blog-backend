import "dotenv/config";
import express from "express";
import wss from "express-ws";

const app = express();
const PORT = process.env.PORT || 5050;