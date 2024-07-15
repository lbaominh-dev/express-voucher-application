import 'module-alias/register';

import connectDB from "./lib/database";
import dotenv from "dotenv";
import path from "path";
import app from "./app";
import initAgenda from "./lib/agenda";
import videoQueue from "./lib/bull";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const PORT = process.env.PORT || 3000;

// videoQueue.add({ video: "http://example.com/video1.mov" });
// initAgenda()
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
