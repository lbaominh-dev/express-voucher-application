import userRepository from "./user.reponsitory";

const getMe = async (id: string) => {
  return await userRepository.getById(id);
};

const userService = {
  getMe,
};

export default userService;
