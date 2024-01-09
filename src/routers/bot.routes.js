import Router from "express";
import { Get, Post } from "../controllers/bot.controllers.js";

export const BotRotures = Router();

BotRotures.get("/", Get).post('/',Post);
