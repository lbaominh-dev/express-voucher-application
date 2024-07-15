import { SMTP_USER } from "@/config";
import { withTransaction } from "@/utils/transaction";
import { Request, Response } from "express";
import httpStatus from "http-status";
import sendMailService from "../mail/mail.service";
import voucherServices from "./voucher.service";
import { UserModel } from "../user/user.model";
import catchAsync from "@/utils/catchAsync";
import { ApiError } from "../errors";

export const getAllVouchers = catchAsync(
  async (req: Request, res: Response) => {
    const vouchers = await voucherServices.getAll();
    res.status(httpStatus.OK).json(vouchers);
  }
);

export const updateVoucher = catchAsync(async (req: Request, res: Response) => {
  const voucher = await voucherServices.update(req.params.id, req.body);
  res.status(httpStatus.OK).json(voucher);
});

export const createVoucher = catchAsync(async (req: Request, res: Response) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const voucher = await withTransaction((session) =>
    voucherServices.create(req.body, session)
  );

  // Add queue to send email
  sendMailService.sendMailVoucher(req.body.email, voucher.code);

  res.status(httpStatus.CREATED).json(voucher);
});

export const deleteVoucher = catchAsync(async (req: Request, res: Response) => {
  await voucherServices.remove(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});
