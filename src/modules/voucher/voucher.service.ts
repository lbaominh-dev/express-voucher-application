import mongoose from "mongoose";
import voucherRepository from "./voucher.repository";

const getAll = async () => {
  const vouchers = await voucherRepository.getAll();

  return vouchers;
};

const create = async (voucher: any, session: mongoose.mongo.ClientSession) =>  voucherRepository.create(voucher, { session });

const generateCode = () => {
  return Math.random().toString(36).substring(2, 15);
};

const voucherServices = {
  getAll,
  create,
  generateCode,
};

export default voucherServices;
