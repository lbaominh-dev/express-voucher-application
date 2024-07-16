import "module-alias/register";

import app from "./app";
import { PORT } from "./config";
import { startWorker } from "./lib/bullmq";
import connectDB from "./lib/database";

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
