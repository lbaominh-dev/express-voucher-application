import "module-alias/register";

import connectDB from "./lib/database";
import dotenv from "dotenv";
import path from "path";
import app from "./app";
import initAgenda from "./lib/agenda";
import { startWorker } from "./lib/bullmq";
import { PORT } from "./config";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const startServer = async () => {
  await connectDB();
  // initAgenda()
  startWorker();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
  });
};

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err);
  process.exit(1);
})

startServer();
