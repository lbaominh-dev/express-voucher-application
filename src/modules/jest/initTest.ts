import { messageQueue, messageWorker } from "@/lib/bullmq";

const initTest = () => {
  beforeAll(() => {
    process.env.MONGO_URI = "mongodb://root:root1234@localhost:27017";
    process.env.PORT = "3000";
    process.env.JWT_SECRET =
      "bfff4f1aa106be94a9c17bde32b069907a2390b2b19d805ddf9eda51f0f76414";
    process.env.REFRESH_TOKEN_SECRET =
      "bfff4f1aa106be94a9c17bde32b069907a2390b2b19d805ddf9eda51f0f76414";
  });

  afterAll(async () => {
    await messageQueue.close();
    await messageQueue.disconnect();
    await messageWorker.close();
    await messageWorker.disconnect();
  });
};

export default initTest;
