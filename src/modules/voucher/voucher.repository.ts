import { VoucherModel } from "./voucher.model";

const getAll = async () => {
  return await VoucherModel.find({});
};

const getById = async (id: string) => {
  return await VoucherModel.findById(id);
};

const create = async (data: any, options: any) => {
  return await VoucherModel.create([data], options);
};

const update = async (id: string, event: any) => {
  return await VoucherModel.findByIdAndUpdate(id, event);
};

const remove = async (id: string) => {
  return await VoucherModel.findByIdAndDelete(id);
};

const voucherRepository = {
  getAll,
  getById,
  create,
  update,
  remove,
};

export default voucherRepository;
