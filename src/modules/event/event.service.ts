import e from "express";
import eventRepository from "./event.reponsitory";
import { EventCreateInput, EventUpdateInput } from "./event.validation";
import { EventEditStatus } from "./event.model";
import mongoose from "mongoose";

const createEvent = async (event: EventCreateInput) => {
  const newEvent = await eventRepository.create(event);
  return newEvent;
};

const getAllEvents = async () => {
  return await eventRepository.getAll();
};

const getEventById = async (id: string) => {
  return await eventRepository.getById(id);
};

const updateEvent = async (id: string, event: EventUpdateInput) => {
  const updatedEvent = await eventRepository.update(id, event);
  return updatedEvent;
};

const checkEditable = async (id: string, userId: string) => {
  const event = await eventRepository.getById(id);

  if (!event) {
    throw new Error("Event not found");
  }

  if (event.userEditing?.toString() !== userId) {
    throw new Error("You are not allowed to edit this event");
  }

  if (event.expiredEditingDate && event.expiredEditingDate < new Date()) {
    throw new Error("Editing time is expired");
  }

  return event;
};

const maintainEditable = async (id: string, userId: string) => {
  const event = await eventRepository.getById(id);

  if (!event) {
    throw new Error("Event not found");
  }

  const stillEditing =
    event.expiredEditingDate && event.expiredEditingDate > new Date();
  if (
    stillEditing &&
    event.editStatus === EventEditStatus.LOCKED &&
    event.userEditing?.toString() !== userId
  ) {
    throw new Error("Event is locked");
  }

  event.editStatus = EventEditStatus.LOCKED;
  event.userEditing = new mongoose.Types.ObjectId(userId);
  event.expiredEditingDate = new Date(new Date().getTime() + 1000 * 60 * 5);
  await event.save();

  return event;
};

const releaseEditable = async (id: string, userId: string) => {
  const event = await eventRepository.getById(id);

  if (!event) {
    throw new Error("Event not found");
  }

  if (event.editStatus === EventEditStatus.EDITABLE) {
    throw new Error("Event is already editable");
  }

  if (event.userEditing?.toString() !== userId) {
    throw new Error("You are not allowed to release this event");
  }

  event.editStatus = EventEditStatus.EDITABLE;
  event.userEditing = undefined;
  event.expiredEditingDate = undefined;
  await event.save();

  return event;
};

const eventServices = {
  create: createEvent,
  getAll: getAllEvents,
  getById: getEventById,
  update: updateEvent,
  checkEditable,
  maintainEditable,
  releaseEditable,
};

export default eventServices;
