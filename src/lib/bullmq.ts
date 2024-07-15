import sendMailService from "@/modules/mail/mail.service";
import { Queue, Worker } from "bullmq";

export enum WorkerType {
  SEND_MAIL = "send_mail",
}

export enum QueueType {
  MESSAGE_QUEUE = "messageQueue",
}

const connection = {
  host: "localhost",
  port: 6379,
};

export const messageQueue = new Queue(QueueType.MESSAGE_QUEUE, { connection });

export const messageWorker = new Worker(
  QueueType.MESSAGE_QUEUE,
  async (job) => {
    switch (job.name) {
      case WorkerType.SEND_MAIL:
        return sendMailService.workerActionSendMail(job.data);
    }

    return job.data;
  },
  {
    connection,
    autorun: false,
  }
);

export const startWorker = async () => {
  messageWorker.on("completed", (job) => {
    console.log('Job completed with result', job.name, job.data)
  });
  messageWorker.on("failed", (job) => {
    console.log(`Job failed with reason ${job?.failedReason}`);
  });
  messageWorker.on("error", (error) => {
    console.log(`Job error with result ${error}}`);
  });

  await messageWorker.run();
};
