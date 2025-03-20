import express from "express";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import { connectDB } from "./lib/db.js";
import "dotenv/config";

import job from "./lib/cron.js";

const server = express();

job.start();
server.use(express.json());
server.use("/api/auth", authRoutes);
server.use("/api/books", bookRoutes);

server.listen(process.env.PORT, () => {
  console.log("server is working");
  connectDB();
});
