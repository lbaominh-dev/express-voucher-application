import userRepository from "./user.reponsitory";
import { LoginUserInput, RegisterUserInput } from "./user.validation";
import jwt from "jsonwebtoken";

const registerUser = async (user: RegisterUserInput) => {
  const checkIsEmailExist = await userRepository.findUserByEmail(user.email);
  if (checkIsEmailExist) {
    throw new Error("Email already exists");
  }

  return await userRepository.createUser(user);
};

const loginUser = async (data: LoginUserInput) => {
  const user = await userRepository.findUserByEmail(data.email);

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

const getMe = async (id: string) => {
  return await userRepository.getUserById(id);
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
  const user = await userRepository.getUserById(userId);

  if(!user) {
    throw new Error("User not found");
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken }
} 

const userService = {
  registerUser,
  loginUser,
  getMe,
  checkRefreshToken,
  generateToken,
};

export default userService;
