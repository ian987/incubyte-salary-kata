import request from "supertest";
import app from "../app";

describe("Salary Metrics", () => {
  beforeEach(async () => {
    await request(app).post("/employees").send({
      fullName: "Alice",
      jobTitle: "Engineer",
      country: "India",
      salary: 80000,
    });
    await request(app).post("/employees").send({
      fullName: "Bob",
      jobTitle: "Engineer",
      country: "India",
      salary: 120000,
    });
    await request(app).post("/employees").send({
      fullName: "Charlie",
      jobTitle: "Manager",
      country: "India",
      salary: 150000,
    });
    await request(app).post("/employees").send({
      fullName: "Diana",
      jobTitle: "Engineer",
      country: "United States",
      salary: 200000,
    });
  });

  it("returns min, max and average salary for a given country", async () => {
    const response = await request(app).get("/salary/metrics?country=India");

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      country: "India",
      min: 80000,
      max: 150000,
      average: 116666.66666666667,
    });
  });

  it("returns average salary for a given job title", async () => {
    const response = await request(app).get(
      "/salary/metrics?jobTitle=Engineer",
    );

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      jobTitle: "Engineer",
      average: 133333.33333333334,
    });
  });

  it("returns 400 if neither country nor jobTitle is provided", async () => {
    const response = await request(app).get("/salary/metrics");
    expect(response.status).toBe(400);
  });

  it("returns 404 if no employees found for given country", async () => {
    const response = await request(app).get(
      "/salary/metrics?country=Australia",
    );
    expect(response.status).toBe(404);
  });

  it("returns 404 if no employees found for given job title", async () => {
    const response = await request(app).get(
      "/salary/metrics?jobTitle=Designer",
    );
    expect(response.status).toBe(404);
  });
});
