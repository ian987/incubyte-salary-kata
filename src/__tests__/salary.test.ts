import request from "supertest";
import app from "../app";

describe("Salary Calculation", () => {
  it("calculates 10% TDS deduction for India", async () => {
    const created = await request(app).post("/employees").send({
      fullName: "Raj Kumar",
      jobTitle: "Engineer",
      country: "India",
      salary: 100000,
    });

    const id = created.body.id;
    const response = await request(app).get(`/employees/${id}/salary`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      grossSalary: 100000,
      deduction: 10000,
      netSalary: 90000,
    });
  });

  it("calculates 12% TDS deduction for United States", async () => {
    const created = await request(app).post("/employees").send({
      fullName: "John Smith",
      jobTitle: "Manager",
      country: "United States",
      salary: 100000,
    });

    const id = created.body.id;
    const response = await request(app).get(`/employees/${id}/salary`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      grossSalary: 100000,
      deduction: 12000,
      netSalary: 88000,
    });
  });

  it("calculates 0% deduction for other countries", async () => {
    const created = await request(app).post("/employees").send({
      fullName: "Pierre Dupont",
      jobTitle: "Designer",
      country: "France",
      salary: 100000,
    });

    const id = created.body.id;
    const response = await request(app).get(`/employees/${id}/salary`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      grossSalary: 100000,
      deduction: 0,
      netSalary: 100000,
    });
  });

  it("returns 404 if employee not found", async () => {
    const response = await request(app).get("/employees/99999/salary");
    expect(response.status).toBe(404);
  });
});
