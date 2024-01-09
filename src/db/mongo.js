import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/bot")
  .then(console.log("connection"))
  .catch((e) => console.log(e.massage));
