import { Request, Response } from "express";
import userService from "./user.service";

export const getMe = async (req: Request, res: Response) => {
  try {
    const { _id } = (req as any).userData;
    const me = await userService.getMe(_id);

    if (!me) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(me);
  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
};
