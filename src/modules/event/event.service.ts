import { EventCreateInput, EventUpdateInput } from "./event.validation";
import { EventEditStatus, EventModel } from "./event.model";
import mongoose from "mongoose";
import { ApiError } from "../errors";
import httpStatus from "http-status";
import { th } from "@faker-js/faker";

const LOCKED_TIME = 1000 * 10; // 10 seconds

const createEvent = async (event: EventCreateInput) => {
  const newEvent = await EventModel.create(event);
  return newEvent;
};

const getAllEvents = async () => {
  return await EventModel.find();
};

const getEventById = async (id: string) => {
  return await EventModel.findById(id);
};

const updateEvent = async (id: string, event: EventUpdateInput) => {
  const updatedEvent = await EventModel.findByIdAndUpdate(id, event);
  return updatedEvent;
};

const checkEditable = async (id: string, userId: string) => {
  const event = await EventModel.findById(id);

  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, "Event not found");
  }

  if (event.editStatus === EventEditStatus.LOCKED) {
    if (event.userEditing && event.userEditing?.toString() !== userId) {
      throw new ApiError(
        httpStatus.FORBIDDEN,
        "You are not allowed to edit this event"
      );
    }

    if (event.expiredEditingDate && event.expiredEditingDate < new Date()) {
      throw new ApiError(httpStatus.FORBIDDEN, "Editing time has expired");
    }

    throw new ApiError(httpStatus.BAD_REQUEST, "Event is locked");
  }

  return event;
};

const maintainEditable = async (id: string, userId: string) => {
  const event = await EventModel.findById(id);
  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, "Event not found");
  }

  const stillEditing =
    event.expiredEditingDate && event.expiredEditingDate > new Date();
  if (
    stillEditing &&
    event.editStatus === EventEditStatus.LOCKED &&
    event.userEditing?.toString() !== userId
  ) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "You are not allowed to maintain this event"
    );
  }

  event.editStatus = EventEditStatus.LOCKED;
  event.userEditing = new mongoose.Types.ObjectId(userId);
  event.expiredEditingDate = new Date(new Date().getTime() + LOCKED_TIME);
  await event.save();

  return event;
};

const releaseEditable = async (id: string, userId: string) => {
  const event = await EventModel.findById(id);

  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, "Event not found");
  }

  const stillEditing =
    event.expiredEditingDate && event.expiredEditingDate > new Date();

  if (!stillEditing || event.editStatus === EventEditStatus.EDITABLE) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Event is already editable");
  }

  if (event.userEditing?.toString() !== userId) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "You are not allowed to release this event"
    );
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
