import { Request, Response } from "express";
import userService from "./user.service";

const options = {
  httpOnly: true,
  // secure: true,
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
};
export const loginUser = async (req: Request, res: Response) => {
  try {
    const token = await userService.loginUser(req.body);

    res
      .status(200)
      .cookie("refreshToken", token.refreshToken, options)
      .cookie("accessToken", token.accessToken, options)
      .json(token);
  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
};
export const getMe = async (req: any, res: Response) => {
  try {
    const { _id } = req.userData as any;
    const me = await userService.getMe(_id);

    if (!me) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(me);
  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
};
export const refreshToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies?.refreshToken || req.body.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = await userService.checkRefreshToken(refreshToken);

    res
      .status(200)
      .cookie("refreshToken", token.refreshToken, options)
      .cookie("accessToken", token.accessToken, options)
      .json(token);
  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
};
