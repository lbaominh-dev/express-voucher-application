import { Request, Response } from "express";
import eventServices from "./event.service";
import catchAsync from "@/utils/catchAsync";

export const createEvent = catchAsync(async (req: Request, res: Response) => {
  const event = await eventServices.create(req.body);
  res.status(201).json(event);
});

export const getAllEvents = catchAsync(async (req: Request, res: Response) => {
  const events = await eventServices.getAll();
  res.status(200).json(events);
});

export const getEventById = catchAsync(async (req: Request, res: Response) => {
  const event = await eventServices.getById(req.params.id);
  res.status(200).json(event);
});

export const updateEvent = catchAsync(async (req: Request, res: Response) => {
  const event = await eventServices.update(req.params.id, req.body);
  res.status(200).json(event);
});

export const checkEditable = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { _id: userId } = (req as any).userData;

  const event = await eventServices.checkEditable(id, userId);
  res.status(200).json(event);
});

export const maintainEditable = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { _id: userId } = (req as any).userData;

    const event = await eventServices.maintainEditable(id, userId);
    res.status(200).json(event);
  }
);

export const releaseEditable = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { _id: userId } = (req as any).userData;

    const event = await eventServices.releaseEditable(id, userId);
    res.status(200).json(event);
  }
);
