import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import request from "supertest";
import app from "../../app";
import initTest from "../jest/initTest";
import setupTestDB from "../jest/setupTestDB";
import { VoucherModel } from "./voucher.model";
import { EventModel, Event } from "../event/event.model";
import { UserModel } from "../user/user.model";

initTest();
setupTestDB("vouchers");

const user = {
  name: faker.internet.userName(),
  email: faker.internet.email().toLowerCase(),
  password: "password1",
};

describe("Voucher Module", () => {
  describe("GET /vouchers", () => {
    test("should return 200 and get all vouchers", async () => {
      const event = await EventModel.create({
        title: faker.lorem.words(2),
        description: faker.lorem.words(10),
        location: faker.lorem.words(2),
        date: faker.date.future(),
        maxQuantity: 10,
      });

      const vouchers = [
        {
          code: faker.string.alphanumeric(10),
          discount: faker.number.int({ min: 1, max: 100 }),
          eventId: event.id,
        },
        {
          code: faker.string.alphanumeric(10),
          discount: faker.number.int({ min: 1, max: 100 }),
          eventId: event.id,
        },
      ];
      await VoucherModel.create(vouchers);

      const res = await request(app).get("/api/vouchers").expect(httpStatus.OK);

      expect(res.body).toHaveLength(2);
    });

    test("should return 200 and get empty array if no vouchers", async () => {
      const res = await request(app).get("/api/vouchers").expect(httpStatus.OK);

      expect(res.body).toHaveLength(0);
    });
  });

  describe("POST /voucher", () => {
    let eventModel: any;

    beforeEach(async () => {
      eventModel = await EventModel.create({
        title: faker.lorem.words(2),
        description: faker.lorem.words(10),
        location: faker.lorem.words(2),
        date: faker.date.future(),
        maxQuantity: 10,
      });

      await UserModel.create(user);
    });

    test("should return 201 and create a new voucher", async () => {
      const voucher = {
        email: user.email,
        discount: faker.number.int({ min: 1, max: 100 }),
        eventId: eventModel._id,
      };

      const res = await request(app)
        .post("/api/voucher")
        .send(voucher)
        .expect(httpStatus.CREATED);

      expect(res.body).toHaveProperty("discount", voucher.discount);
      expect(res.body).toHaveProperty("code");
    });

    test("should return 404 if event not found", async () => {
      const voucher = {
        email: user.email,
        discount: faker.number.int({ min: 1, max: 100 }),
        eventId: faker.database.mongodbObjectId(),
      };

      const res = await request(app)
        .post("/api/voucher")
        .send(voucher)
        .expect(httpStatus.NOT_FOUND);

      console.log(res.body);

      expect(res.body.message).toBe("Event not found");
    });

    test("should return 400 if event is full", async () => {
      const voucher = {
        email: user.email,
        discount: faker.number.int({ min: 1, max: 100 }),
        eventId: eventModel._id,
      };

      eventModel.quantity = eventModel.maxQuantity;
      await eventModel.save();

      await VoucherModel.create({
        code: faker.string.alphanumeric(10),
        discount: faker.number.int({ min: 1, max: 100 }),
        eventId: eventModel._id,
      });

      const res = await request(app)
        .post("/api/voucher")
        .send(voucher)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.message).toBe("Event is full");
    });

    test("should return 400 if email is missing", async () => {
      const voucher = {
        discount: faker.number.int({ min: 1, max: 100 }),
        eventId: eventModel._id,
      };

      const res = await request(app)
        .post("/api/voucher")
        .send(voucher)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.errors[0].path).toContain("email");
    });
  });
});
