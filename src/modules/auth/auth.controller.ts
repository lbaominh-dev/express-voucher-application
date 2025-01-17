import { Request, Response } from "express";
import userService from "./auth.service";
import catchAsync from "@/utils/catchAsync";
import httpStatus from "http-status";

const options = {
  httpOnly: true,
  // secure: true,
};

export const registerUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.registerUser(req.body);
  res.status(httpStatus.CREATED).json(user);
});

export const loginUser = catchAsync(async (req: Request, res: Response) => {
  const token = await userService.loginUser(req.body);
  res
    .status(httpStatus.OK)
    .cookie("refreshToken", token.refreshToken, options)
    .cookie("accessToken", token.accessToken, options)
    .json(token);
});

export const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refreshToken || req.body.refreshToken;

  if (!refreshToken) {
    return res.status(httpStatus.UNAUTHORIZED).json({ message: "Unauthorized" });
  }

  const token = await userService.checkRefreshToken(refreshToken);

  res
    .status(httpStatus.OK)
    .cookie("refreshToken", token.refreshToken, options)
    .cookie("accessToken", token.accessToken, options)
    .json(token);
});
