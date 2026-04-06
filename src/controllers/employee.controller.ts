import { Request, Response } from "express";
import db from "../db/database";

export const createEmployee = (req: Request, res: Response) => {
  const { fullName, jobTitle, country, salary } = req.body;

  if (!fullName || !jobTitle || !country || !salary) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const stmt = db.prepare(
    "INSERT INTO employees (fullName, jobTitle, country, salary) VALUES (?, ?, ?, ?)",
  );
  const result = stmt.run(fullName, jobTitle, country, salary);

  const employee = db
    .prepare("SELECT * FROM employees WHERE id = ?")
    .get(result.lastInsertRowid);

  return res.status(201).json(employee);
};

export const getAllEmployees = (req: Request, res: Response) => {
  const employees = db.prepare("SELECT * FROM employees").all();
  return res.status(200).json(employees);
};

export const getEmployeeById = (req: Request, res: Response) => {
  const { id } = req.params;
  const employee = db.prepare("SELECT * FROM employees WHERE id = ?").get(id);

  if (!employee) {
    return res.status(404).json({ error: "Employee not found" });
  }

  return res.status(200).json(employee);
};

export const updateEmployee = (req: Request, res: Response) => {
  const { id } = req.params;
  const { fullName, jobTitle, country, salary } = req.body;

  const existing = db.prepare("SELECT * FROM employees WHERE id = ?").get(id);

  if (!existing) {
    return res.status(404).json({ error: "Employee not found" });
  }

  db.prepare(
    "UPDATE employees SET fullName = ?, jobTitle = ?, country = ?, salary = ? WHERE id = ?",
  ).run(fullName, jobTitle, country, salary, id);

  const updated = db.prepare("SELECT * FROM employees WHERE id = ?").get(id);

  return res.status(200).json(updated);
};

export const deleteEmployee = (req: Request, res: Response) => {
  const { id } = req.params;

  const existing = db.prepare("SELECT * FROM employees WHERE id = ?").get(id);

  if (!existing) {
    return res.status(404).json({ error: "Employee not found" });
  }

  db.prepare("DELETE FROM employees WHERE id = ?").run(id);

  return res.status(200).json({ message: "Employee deleted successfully" });
};
