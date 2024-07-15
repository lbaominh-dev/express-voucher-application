import userRepository from "../user/user.reponsitory";
import { LoginUserInput, RegisterUserInput } from "./auth.validation";
import jwt from "jsonwebtoken";

const registerUser = async (user: RegisterUserInput) => {
  const checkIsEmailExist = await userRepository.getByEmail(user.email);
  if (checkIsEmailExist) {
    throw new Error("Email already exists");
  }

  return await userRepository.create(user);
};

const loginUser = async (data: LoginUserInput) => {
  const user = await userRepository.getByEmail(data.email);

  if (!user) {
    throw new Error("User not found");
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  const isPasswordValid = user.isPasswordCorrect(data.password);
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  return {
    accessToken,
    refreshToken,
  };
};

const checkRefreshToken = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new Error("Unauthorized");
  }

  const decoded = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string
  ) as any;

  return await generateToken(decoded._id);
};

const generateToken = async (userId: string) => {
  const user = await userRepository.getById(userId);

  if (!user) {
    throw new Error("User not found");
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
