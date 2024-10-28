import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./modules/auth";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  signIn,
  updateUser,
} from "./handlers/user";
const app = express();
const cookieParser = require("cookie-parser");

app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

app.use(express.json()); //parse json body
app.use(express.urlencoded({ extended: true })); //parse urlencoded body
app.get("/", (req, res, next) => {
  // next(new Error("Something went wrong")); //test error handling asychronously
  res.status(200).json({ message: "hello" }).end();
});
app.use("/api", protect, router); //everything in router will be prefixed with /api
app.post("/signin", signIn);
app.post("/user", createUser);
app.put("/user", protect, updateUser);
app.get("/user", protect, getUser);
app.get("/users", protect, getAllUsers);
app.delete("/user", protect, deleteUser);
app.use((err, req, res, next) => {
  if (err.type === "auth") {
    return res.status(401).json({ message: "unauthorized" + err.message });
  } else if (err.type === "input") {
    return res.status(400).json({ message: "bad request" });
  } else return res.status(500).json({ message: "server error" + err.message });
});
export default app;
