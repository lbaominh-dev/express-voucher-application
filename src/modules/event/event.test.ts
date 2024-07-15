import { de, faker } from "@faker-js/faker";
import httpStatus from "http-status";
import request from "supertest";
import app from "../../app";
import initTest from "../jest/initTest";
import setupTestDB from "../jest/setupTestDB";
import { EventEditStatus, EventModel } from "./event.model";
import { VoucherModel } from "../voucher/voucher.model";

initTest();
setupTestDB("events");

describe("Event Module", () => {
  describe("GET /events", () => {
    test("should return 200 and get all events", async () => {
      const events = [
        {
          title: faker.lorem.words(2),
          description: faker.lorem.words(10),
          location: faker.lorem.words(2),
          date: faker.date.future(),
          maxQuantity: 10,
        },
        {
          title: faker.lorem.words(2),
          description: faker.lorem.words(10),
          location: faker.lorem.words(2),
          date: faker.date.future(),
          maxQuantity: 10,
        },
      ];
      await EventModel.create(events);

      const res = await request(app).get("/api/events").expect(httpStatus.OK);

      expect(res.body).toHaveLength(2);
    });

    test("should return 200 and get empty array if no events", async () => {
      const res = await request(app).get("/api/events").expect(httpStatus.OK);

      expect(res.body).toHaveLength(0);
    });
  });

  describe("POST /event", () => {
    test("should return 201 and create a new event", async () => {
      const newEvent = {
        title: faker.lorem.words(2),
        description: faker.lorem.words(10),
        location: faker.lorem.words(2),
        date: faker.date.future().getTime(),
        maxQuantity: 10,
        quantity: 1,
      };

      const res = await request(app)
        .post("/api/event")
        .send(newEvent)
        .expect(httpStatus.CREATED);

      expect(res.body).toHaveProperty("title", newEvent.title);
      expect(res.body).toHaveProperty("description", newEvent.description);
      expect(res.body).toHaveProperty("location", newEvent.location);
      expect(res.body).toHaveProperty("maxQuantity", newEvent.maxQuantity);
    });
  });

  describe("POST /event/:id/editable/me", () => {
    let accessToken: string;

    beforeEach(async () => {
      const user = {
        name: faker.internet.userName(),
        email: faker.internet.email().toLowerCase(),
        password: "password1",
      };

      await request(app).post("/api/auth/register").send(user);
      accessToken = (await request(app).post("/api/auth/login").send(user)).body
        .accessToken;
    });

    test("should return 200 and check editable", async () => {
      const event = await EventModel.create({
        title: faker.lorem.words(2),
        description: faker.lorem.words(10),
        location: faker.lorem.words(2),
        date: faker.date.future(),
        maxQuantity: 10,
        quantity: 1,
      });

      const res = await request(app)
        .post(`/api/event/${event._id}/editable/me`)
        .set("Authorization", `Bearer ${accessToken}`)
        .expect(httpStatus.OK);

      expect(res.body).toHaveProperty("editStatus", 0);
    });

    test("should return 400 if event is locked", async () => {
      const event = await EventModel.create({
        title: faker.lorem.words(2),
        description: faker.lorem.words(10),
        location: faker.lorem.words(2),
        date: faker.date.future(),
        maxQuantity: 10,
        quantity: 1,
        editStatus: EventEditStatus.LOCKED,
        expiredEditingDate: faker.date.future(),
      });

      const res = await request(app)
        .post(`/api/event/${event._id}/editable/me`)
        .set("Authorization", `Bearer ${accessToken}`)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body).toHaveProperty("message", "Event is locked");
    });
  });
});
