import { Request, Response } from "express";
import userService from "./auth.service";

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
