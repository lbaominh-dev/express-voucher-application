import { withTransaction } from "@/utils/transaction";
import { Request, Response } from "express";
import httpStatus from "http-status";
import eventServices from "../event/event.service";
import voucherServices from "./voucher.service";

export const getAllVouchers = async (req: Request, res: Response) => {
  try {
    const vouchers = await voucherServices.getAll();
    res.status(httpStatus.OK).json(vouchers);
  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
};

export const createVoucher = async (req: Request, res: Response) =>
  withTransaction(async (session) => {
    try {
      const event = await eventServices.getById(req.body.eventId);

      if (!event) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ message: "Event not found" });
      }

      const data = {
        ...req.body,
        code: voucherServices.generateCode(),
        eventId: event._id.toString(),
      };
      
      const [voucher] = await voucherServices.create(data, session);

      await event.updateOne({
        $inc: { quantity: 1 },
        $addToSet: { vouchers: voucher._id },
      });
      await event.save(); 

      res.status(httpStatus.CREATED).json(voucher);
    } catch (error) {
      res.status(500).json({ message: (error as any).message });
    }
  });
