import { EventModel } from "./event.model";

const getAll = async () => {
  return await EventModel.find({}).populate("vouchers", "code discount").exec();
};

const getById = async (id: string) => {
  return await EventModel.findById(id);
};

const create = async (event: any) => {
  return await EventModel.create(event);
};

const update = async (id: string, event: any) => {
  return await EventModel.findByIdAndUpdate(id, event);
};

const remove = async (id: string) => {
  return await EventModel.findByIdAndDelete(id);
};

const eventRepository = {
  getAll,
  getById,
  create,
  update,
  remove,
};

export default eventRepository;
