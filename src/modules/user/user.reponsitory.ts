import { User, UserModel } from "./user.model";
import { RegisterUserInput } from "./user.validation";

const getAllUsers = async () => {
  return await UserModel.find();
};

const createUser = async (user: RegisterUserInput) => {
  return await UserModel.create(user);
};

const findUserByEmail = async (email: string) => {
  return await UserModel.findOne({ email });
};

const getUserById = async (id: string) => {
  return await UserModel.findById(id).select("-password -refreshToken");
};

const userRepository = {
  getAllUsers,
  createUser,
  findUserByEmail,
  getUserById,
};

export default userRepository;
