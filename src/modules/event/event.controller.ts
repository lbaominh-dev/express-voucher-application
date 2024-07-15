import { Request, Response } from "express";
import eventServices from "./event.service";

export const createEvent = async (req: Request, res: Response) => {
  try {
    const event = await eventServices.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
};

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await eventServices.getAll();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  try {
    const event = await eventServices.getById(req.params.id);
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
}

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const event = await eventServices.update(req.params.id, req.body);
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
}
