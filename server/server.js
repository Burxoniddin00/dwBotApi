import express from "express";
import "./db/mongo.js";
import { BotRotures } from "./routers/bot.routes.js";
import cors from 'cors'
const PORT = 8123;


const app = express();
app.use(express.json())
app.use(cors());


app.use('/bot',BotRotures)

app.listen(PORT, console.log("Run Server>>>>>>>>>>>"));


