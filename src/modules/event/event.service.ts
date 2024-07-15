import e from "express";
import eventRepository from "./event.reponsitory";
import { EventCreateInput, EventUpdateInput } from "./event.validation";

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

const eventServices = {
  create: createEvent,
  getAll: getAllEvents,
  getById: getEventById,
  update: updateEvent,
};

export default eventServices;
