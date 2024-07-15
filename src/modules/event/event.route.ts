import express from "express";
import { createEvent, getAllEvents, getEventById, updateEvent } from "./event.controller";
import validateMiddleware from "@/middlewares/validate.middleware";
import { eventCreateSchema, eventUpdateSchema } from "./event.validation";

const app = express.Router();

app.get("/events", getAllEvents);
app.post("/event", validateMiddleware(eventCreateSchema), createEvent);
app.get("/event/:id", getEventById)
app.put("/event/:id", validateMiddleware(eventUpdateSchema), updateEvent)


// app.delete("/:id", (req, res) => {})

export default app;

/**
 * @swagger
 * tags:
 *  name: Events
 *  description: API for Events in the system
*/

/**
 * @swagger
 * /events:
 *     get:
 *         summary: Get all events
 *         tags: [Events]
 *         responses:
 *             200:
 *                 description: Successful operation
 *             401:
 *                 description: Unauthorized
 *             404:
 *                 description: Not found    
 */