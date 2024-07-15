import mongoose from "mongoose";
import voucherRepository from "./voucher.repository";
import eventServices from "../event/event.service";

const getAll = async () => {
  const vouchers = await voucherRepository.getAll();

  return vouchers;
};

const update = async (id: string, data: any) => {
  const voucher = await voucherRepository.getById(id);

  if (!voucher) {
    throw new Error("Voucher not found");
  }

  const updatedVoucher = await voucherRepository.update(id, data);

  return updatedVoucher;
}

const create = async (voucher: any, session: mongoose.mongo.ClientSession) => {
  const event = await eventServices.getById(voucher.eventId.toString());

  if (!event) {
    throw new Error("Event not found");
  }

  if(event.quantity >= event.maxQuantity) {
    throw new Error("Event is full");
  }

  const data = {
    ...voucher,
    code: voucherServices.generateCode(),
    eventId: event._id.toString(),
  };

  const [newVoucher] = await voucherRepository.create(data, { session });

  await event.updateOne({
    $inc: { quantity: 1 },
    $addToSet: { vouchers: newVoucher },
  });
  await event.save();

  return newVoucher;
};

const remove = async (id: string) => {
  const voucher = await voucherRepository.getById(id);

  if (!voucher) {
    throw new Error("Voucher not found");
  }

  const event = await eventServices.getById(voucher.eventId as unknown as string);

  if (!event) {
    throw new Error("Event not found");
  }

  await event.updateOne({
    $inc: { quantity: -1 },
    $pull: { vouchers: voucher },
  });
  await event.save();

  await voucherRepository.remove(id);

}

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
