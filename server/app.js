import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/users.route.js";
import imageRouter from "./routes/gallery.route.js";
const app = express();

app.use(express.urlencoded({ extended: process.env.URL_ENCODE }));
app.use(express.json({ limit: process.env.MAX_JSON_SIZE }));
app.use(cors());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("server started successfully");
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/images", imageRouter);

export default app;
