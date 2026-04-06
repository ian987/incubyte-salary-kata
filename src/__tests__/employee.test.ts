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

  it("GET /employees - returns list of all employees", async () => {
    const response = await request(app).get("/employees");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("GET /employees/:id - returns a single employee", async () => {
    const created = await request(app).post("/employees").send({
      fullName: "Jane Doe",
      jobTitle: "Designer",
      country: "United States",
      salary: 80000,
    });

    const id = created.body.id;
    const response = await request(app).get(`/employees/${id}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      fullName: "Jane Doe",
      jobTitle: "Designer",
      country: "United States",
      salary: 80000,
    });
  });

  it("GET /employees/:id - returns 404 if employee not found", async () => {
    const response = await request(app).get("/employees/99999");
    expect(response.status).toBe(404);
  });

  it("PUT /employees/:id - updates an employee and returns 200", async () => {
    const created = await request(app).post("/employees").send({
      fullName: "Mark Smith",
      jobTitle: "Manager",
      country: "India",
      salary: 120000,
    });

    const id = created.body.id;

    const response = await request(app).put(`/employees/${id}`).send({
      fullName: "Mark Smith Updated",
      jobTitle: "Senior Manager",
      country: "India",
      salary: 150000,
    });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      fullName: "Mark Smith Updated",
      jobTitle: "Senior Manager",
      country: "India",
      salary: 150000,
    });
  });

  it("PUT /employees/:id - returns 404 if employee not found", async () => {
    const response = await request(app).put("/employees/99999").send({
      fullName: "Ghost",
      jobTitle: "Nobody",
      country: "India",
      salary: 0,
    });

    expect(response.status).toBe(404);
  });

  it("DELETE /employees/:id - deletes an employee and returns 200", async () => {
    const created = await request(app).post("/employees").send({
      fullName: "Tom Hardy",
      jobTitle: "Analyst",
      country: "India",
      salary: 90000,
    });

    const id = created.body.id;

    const response = await request(app).delete(`/employees/${id}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      message: "Employee deleted successfully",
    });

    const check = await request(app).get(`/employees/${id}`);
    expect(check.status).toBe(404);
  });

  it("DELETE /employees/:id - returns 404 if employee not found", async () => {
    const response = await request(app).delete("/employees/99999");
    expect(response.status).toBe(404);
  });
});
