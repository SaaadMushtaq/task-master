import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import "./Models/db";
import authRoutes from "./Routes/AuthRouter";
import projectRoutes from "./Routes/ProjectRouter";
import taskRoutes from "./Routes/TaskRouter";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());
app.use("/auth", authRoutes);
app.use("/auth/projects", projectRoutes);
app.use("/auth/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
