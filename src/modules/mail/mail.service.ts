import { SMTP_HOST, SMTP_PASS, SMTP_PORT, SMTP_USER, SMTP_USERNAME } from "@/config";
import { messageQueue, WorkerType } from "@/lib/bullmq";
import nodemailer from "nodemailer";
import { Message } from "./maii.interface";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const config: SMTPTransport.Options = {
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false,

  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
};

const transporter = nodemailer.createTransport(config);

const sendMailVoucher = async (to: string, voucherCode: string) => {
  const subject = "Voucher code";
  const text = `Your voucher code is: ${voucherCode}`;
  const html = `<p>Your voucher code is: <strong>${voucherCode}</strong></p>`;
  await sendEmail(to, subject, text, html);
};

const workerActionSendMail = async (job: Message) => {
  const { to, subject, text, html } = job;
  await sendEmail(to, subject, text, html ?? "", false);
};

export const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  html: string,
  queue = true
): Promise<void> => {
  if (queue) {
    await messageQueue.add(WorkerType.SEND_MAIL, {
      to,
      subject,
      text,
      html,
    });
    return;
  }

  const msg: Message = {
    from: `<${SMTP_USERNAME}> ${SMTP_USER}`,
    to,
    subject,
    text,
    html,
  };
  await transporter.sendMail(msg);
};

const sendMailService = {
  sendMailVoucher,
  workerActionSendMail,
};

export default sendMailService;
