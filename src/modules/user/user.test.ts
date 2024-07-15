import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import request from "supertest";
import app from "../../app";
import initTest from "../jest/initTest";
import setupTestDB from "../jest/setupTestDB";
import { UserModel } from "../user/user.model";

initTest();
setupTestDB();

describe("User Module", () => {
  describe("POST /user/me", () => {
    test("should return 200 and get user data", async () => {
      const user = await UserModel.create({
        name: faker.internet.userName(),
        email: faker.internet.email().toLowerCase(),
        password: "password1",
      });

      const res = await request(app)
        .get("/api/user/me")
        .set("Authorization", `Bearer ${user.generateAccessToken()}`)
        .expect(httpStatus.OK);

      expect(res.body).toHaveProperty("name", user.name);
      expect(res.body).toHaveProperty("email", user.email);
    });

    test("should return 404 if user not found", async () => {
      const user = await UserModel.create({
        name: faker.internet.userName(),
        email: faker.internet.email().toLowerCase(),
        password: "password1",
      });

      await user.deleteOne();

      const res = await request(app)
        .get("/api/user/me")
        .set("Authorization", `Bearer ${user.generateAccessToken()}`)
        .expect(httpStatus.NOT_FOUND);

      expect(res.body.message).toBe("User not found");
    });

    test("should return 401 if token is invalid", async () => {
        const user = await UserModel.create({
            name: faker.internet.userName(),
            email: faker.internet.email().toLowerCase(),
            password: "password1",
        });
    
        const res = await request(app)
            .get("/api/user/me")
            .set("Authorization", `Bearer invalidtoken`)
            .expect(httpStatus.UNAUTHORIZED);
    
        expect(res.body.message).toBe("Invalid token");
    })
  });
});
