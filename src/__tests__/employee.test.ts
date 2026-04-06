import request from "supertest";
import app from "../app";

describe("Employee CRUD", () => {
  it("POST /employees - creates an employee and returns 201", async () => {
    const response = await request(app).post("/employees").send({
      fullName: "John Doe",
      jobTitle: "Engineer",
      country: "India",
      salary: 100000,
    });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      fullName: "John Doe",
      jobTitle: "Engineer",
      country: "India",
      salary: 100000,
    });
    expect(response.body.id).toBeDefined();
  });
});
