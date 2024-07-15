import { User, UserModel } from "./user.model";
import { RegisterUserInput } from "../auth/auth.validation";

const getAll = async () => {
  return await UserModel.find();
};

const create = async (user: RegisterUserInput) => {
  return await UserModel.create(user);
};

const getByEmail = async (email: string) => {
  return await UserModel.findOne({ email });
};

const getById = async (id: string) => {
  return await UserModel.findById(id).select("-password -refreshToken");
};

const userRepository = {
  getAll,
  create,
  getByEmail,
  getById,
};

export default userRepository;
