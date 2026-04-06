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
