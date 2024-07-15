import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import request from "supertest";
import app from "../../app";
import initTest from "../jest/initTest";
import setupTestDB from "../jest/setupTestDB";
import { UserModel } from "../user/user.model";
import { RegisterUserInput } from "./auth.validation";

initTest();
setupTestDB('users');

describe("Auth Module", () => {
  describe("POST /auth/register", () => {
    let newUser: RegisterUserInput;

    beforeEach(() => {
      newUser = {
        name: faker.internet.userName(),
        email: faker.internet.email().toLowerCase(),
        password: "password1",
      };
    });

    test("should return 201 and create a new user", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send(newUser)
        .expect(httpStatus.CREATED);

      expect(res.body).not.toHaveProperty("password");
      expect(res.body).toHaveProperty("name", newUser.name);
      expect(res.body).toHaveProperty("email", newUser.email);

      const dbUser = await UserModel.findById(res.body._id);

      console.log(dbUser)

      expect(dbUser).toBeDefined();
      expect(dbUser).toHaveProperty("name", newUser.name);
      expect(dbUser).toHaveProperty("email", newUser.email);
    });

    test("should return 409 if email already exists", async () => {
      await UserModel.create([newUser]);

      const res = await request(app)
        .post("/api/auth/register")
        .send(newUser)
        .expect(httpStatus.CONFLICT);

      expect(res.body.message).toBe("Email already exists");
    });

    test("should return 400 if name is missing", async () => {
      newUser.name = "";

      const res = await request(app)
        .post("/api/auth/register")
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.errors[0].path).toContain("name");
    });

    test("should return 400 if email is missing", async () => {
      newUser.email = "";

      const res = await request(app)
        .post("/api/auth/register")
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.errors[0].path).toContain("email");
    });

    test("should return 400 if password is missing", async () => {
      newUser.password = "";

      const res = await request(app)
        .post("/api/auth/register")
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.errors[0].path).toContain("password");
    });

    test("should return 400 if email is invalid", async () => {
      newUser.email = "invalidEmail";

      const res = await request(app)
        .post("/api/auth/register")
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.errors[0].path).toContain("email");
    });
  });

  describe("POST /auth/login", () => {
    test("should return 200 and login user", async () => {
      const newUser = {
        name: faker.internet.userName(),
        email: faker.internet.email().toLowerCase(),
        password: "password1",
      };

      await UserModel.create(newUser);

      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: newUser.email, password: newUser.password })
        .expect(httpStatus.OK);

      expect(res.body).toHaveProperty("accessToken");
      expect(res.body).toHaveProperty("refreshToken");
    });

    test("should return 401 if user does not exist", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: faker.internet.email(), password: "password1" })
        .expect(httpStatus.NOT_FOUND);

      expect(res.body.message).toBe("User not found");
    });

    test("should return 401 if password is incorrect", async () => {
      const newUser = {
        name: faker.internet.userName(),
        email: faker.internet.email().toLowerCase(),
        password: "password1",
      };

      await UserModel.create(newUser);

      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: newUser.email, password: "password2" })
        .expect(httpStatus.UNAUTHORIZED);

      expect(res.body.message).toBe("Invalid password");
    });
  });

  describe("POST /auth/refreshToken", () => {
    test("should return 200 and refresh token", async () => {
      const newUser = {
        name: faker.internet.userName(),
        email: faker.internet.email().toLowerCase(),
        password: "password1",
      };

      await UserModel.create(newUser);

      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: newUser.email, password: newUser.password });

      const res = await request(app)
        .post("/api/auth/refreshToken")
        .set("Cookie", [
          `refreshToken=${loginRes.body.refreshToken}`,
          `accessToken=${loginRes.body.accessToken}`,
        ])
        .expect(httpStatus.OK);

      expect(res.body).toHaveProperty("accessToken");
      expect(res.body).toHaveProperty("refreshToken");
    });
  });
});
