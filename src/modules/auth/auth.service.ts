import httpStatus from "http-status";
import { ApiError } from "../errors";
import { UserModel } from "../user/user.model";
import { LoginUserInput, RegisterUserInput } from "./auth.validation";
import jwt from "jsonwebtoken";

const registerUser = async (user: RegisterUserInput) => {
  const checkIsEmailExist = await UserModel.findOne({ email: user.email });
  if (checkIsEmailExist) {
    throw new ApiError(httpStatus.CONFLICT, "Email already exists");
  }

  return await UserModel.create(user);
};

const loginUser = async (data: LoginUserInput) => {
  const user = await UserModel.findOne({ email: data.email });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  const isPasswordValid = user.isPasswordCorrect(data.password);
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  if (!isPasswordValid) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid password");
  }

  return {
    accessToken,
    refreshToken,
  };
};

const checkRefreshToken = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized");
  }

  const decoded = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string
  ) as any;

  return await generateToken(decoded._id);
};

const generateToken = async (userId: string) => {
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

const userService = {
  registerUser,
  loginUser,
  checkRefreshToken,
  generateToken,
};

export default userService;
