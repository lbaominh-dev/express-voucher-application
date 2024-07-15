import mongoose from "mongoose";
import eventServices from "../event/event.service";
import { VoucherModel } from "./voucher.model";
import { ApiError } from "../errors";
import httpStatus from "http-status";
import { EventModel } from "../event/event.model";

const getAll = async () => {
  const vouchers = await VoucherModel.find().populate({
    path: "eventId",
    select: ["name", "quantity", "maxQuantity", "date"],
  });

  return vouchers;
};

const update = async (id: string, data: any) => {
  const voucher = await VoucherModel.findById(id);

  if (!voucher) {
    throw new ApiError(httpStatus.NOT_FOUND,"Voucher not found");
  }

  const updatedVoucher = await VoucherModel.findByIdAndUpdate(id, data);

  return updatedVoucher;
};

const create = async (voucher: any, session: mongoose.mongo.ClientSession) => {
  const event = await eventServices.getById(voucher.eventId);

  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND,"Event not found");
  }

  if (event.quantity >= event.maxQuantity) {
    throw new ApiError(httpStatus.BAD_REQUEST,"Event is full");
  }

  const data = {
    ...voucher,
    code: voucherServices.generateCode(),
    eventId: event._id.toString(),
  };

  const [newVoucher] = await VoucherModel.create([data], { session });

  await event.updateOne({
    $inc: { quantity: 1 },
  });
  await event.save();

  return newVoucher;
};

const remove = async (id: string) => {
  const voucher = await VoucherModel.findById(id);

  if (!voucher) {
    throw new Error("Voucher not found");
  }

  const event = await EventModel.findById(
    voucher.eventId as unknown as string
  );

  if (!event) {
    throw new Error("Event not found");
  }

  await event.updateOne({
    $inc: { quantity: -1 },
  });
  await event.save();

  await VoucherModel.findByIdAndDelete(id);
};

const generateCode = () => {
  return Math.random().toString(36).substring(2, 15);
};

const voucherServices = {
  getAll,
  create,
  update,
  remove,
  generateCode,
};

export default voucherServices;
