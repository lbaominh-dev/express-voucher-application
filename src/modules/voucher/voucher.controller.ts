import { SMTP_USER } from "@/config";
import { withTransaction } from "@/utils/transaction";
import { Request, Response } from "express";
import httpStatus from "http-status";
import sendMailService from "../mail/mail.service";
import userRepository from "../user/user.reponsitory";
import voucherServices from "./voucher.service";

export const getAllVouchers = async (req: Request, res: Response) => {
  try {
    const vouchers = await voucherServices.getAll();
    res.status(httpStatus.OK).json(vouchers);
  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
};

export const updateVoucher = async (req: Request, res: Response) => {
  try {
    const voucher = await voucherServices.update(req.params.id, req.body);

    res.status(httpStatus.OK).json(voucher);
  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
};

export const createVoucher = async (req: Request, res: Response) => {
  try {
    const voucher = await withTransaction((session) =>
      voucherServices.create(req.body, session)
    );


    const user = await userRepository.getByEmail(req.body.email);
    if(!user) {
      throw new Error("User not found");
    }

    // Add queue to send email
    sendMailService.send({
      from: SMTP_USER,
      to: req.body.email,
      subject: "Voucher code",
      text: `Your voucher code is: ${voucher.code}`,
    })
    
    // res.status(httpStatus.CREATED).json(voucher);
    res.status(httpStatus.CREATED).json({});
  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
};

export const deleteVoucher = async (req: Request, res: Response) => {
  try {
    await voucherServices.remove(req.params.id);

    res.status(httpStatus.NO_CONTENT).send();
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: (error as any).message });
  }
};
