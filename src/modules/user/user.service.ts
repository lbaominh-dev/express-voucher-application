import httpStatus from "http-status";
import { ApiError } from "../errors";
import { UserModel } from "./user.model";

const getMe = async (id: string) => {
  const me = await UserModel.findById(id).select("-password -refreshToken");

  if (!me) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  return me;
};

const userService = {
  getMe,
};

export default userService;
