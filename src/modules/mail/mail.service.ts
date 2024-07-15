import { SMTP_USER } from "@/config";
import { messageQueue, WorkerType } from "@/lib/bullmq";
import transporter from "@/lib/mail";
import { MailOptions } from "nodemailer/lib/json-transport";

const send = async (mailOptions: MailOptions) => {
    await messageQueue.add(WorkerType.SEND_MAIL, mailOptions);
};

const workerActionSendMail = async (job: any) => {
  try {
    await transporter.sendMail({
      ...job,
      from: SMTP_USER,
    });
  } catch (error) {
    throw new Error(`Error sending email: ${error}`);
  }
};

const sendMailService = {
  send,
  workerActionSendMail,
};

export default sendMailService;
