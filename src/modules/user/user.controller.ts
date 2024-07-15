import { Request, Response } from "express";
import userService from "./user.service";
import catchAsync from "@/utils/catchAsync";
import httpStatus from "http-status";

export const getMe = catchAsync(async (req: Request, res: Response) => {
  const { _id } = (req as any).userData;
  const me = await userService.getMe(_id);

  res.status(httpStatus.OK).json(me);
});
