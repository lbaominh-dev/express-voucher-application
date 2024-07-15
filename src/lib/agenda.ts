import { Agenda } from "@hokify/agenda";
import { dbUri } from "../config";
import mongoose from "mongoose";

export const agenda = new Agenda({
  db: { address: dbUri },
});

agenda.on("ready", () => {
  console.log("Agenda connected successfully");
});

agenda.on("error", (error) => {
  console.error("Agenda connection error:", error);
});

agenda.define("health check", async (job, done) => {
  const response = await fetch(`http://localhost:3000/health-check`);
  const data = await response.json()
  
  const currentTime = new Date().toLocaleTimeString();
  console.log(`[${currentTime}] Health check response: ${data}`);
  done();
});

const initAgenda = async () => {
  await agenda.start();
  await agenda.every("5 seconds", "health check");
};

const graceful = async () => {
  await agenda.stop();
  process.exit(0);
};

process.on("SIGTERM", graceful);
process.on("SIGINT", graceful);

export default initAgenda;
