import express from "express";
import { checkEditable, createEvent, getAllEvents, getEventById, maintainEditable, releaseEditable, updateEvent } from "./event.controller";
import validateMiddleware from "@/middlewares/validate.middleware";
import { eventCreateSchema, eventUpdateSchema } from "./event.validation";
import authMiddleware from "@/middlewares/auth.middleware";

const app = express.Router();

app.get("/events", getAllEvents);
app.post("/event", validateMiddleware(eventCreateSchema), createEvent);
app.get("/event/:id", getEventById)
app.put("/event/:id", validateMiddleware(eventUpdateSchema), updateEvent)


// app.delete("/:id", (req, res) => {})

app.post("/event/:id/editable/me", authMiddleware, checkEditable)
app.post("/event/:id/editable/release", authMiddleware, releaseEditable)
app.post("/event/:id/editable/maintain", authMiddleware, maintainEditable)

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

/**
 * @swagger
 * /event/{id}/editable/me:
 *   post:
 *      summary: Check if event is editable
 *      tags: [Events]
 *      security:
 *          - BearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *            description: Successful operation
 *        409:
 *            description: Conflict    
 */

/**
 * @swagger
 * /event/{id}/editable/release:
 *   post:
 *      summary: Release event editable
 *      tags: [Events]
 *      security:
 *          - BearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *            description: Successful operation
 *        409:
 *            description: Conflict    
 */

/**
 * @swagger
 * /event/{id}/editable/maintain:
 *   post:
 *      summary: Maintain event editable
 *      tags: [Events]
 *      security:
 *          - BearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *            description: Successful operation
 *        409:
 *            description: Conflict    
 */