import express from "express";
import env from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "node:path";
import expressEjsLayouts from "express-ejs-layouts";
import router from "./controllers/index.js";
const app = express();

env.config({
  path: "./.env",
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static("./public"));
app.use(expressEjsLayouts);
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");

app.use("/", router);

import mongoose from "mongoose";

mongoose.connect(process.env.Mongodb_URI);

const db = mongoose.connection;

db.on("error", (error) => {
  console.log(`Mongodb connection error`, error);
});

db.once("open", () => {
  console.log(`Mongoose connected successfully`);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT || 5000}`);
});
