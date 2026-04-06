import { Request, Response } from "express";
import {
  insertEmployee,
  findAllEmployees,
  findEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
} from "../db/employee.repository";

export const createEmployee = (req: Request, res: Response) => {
  const { fullName, jobTitle, country, salary } = req.body;

  if (!fullName || !jobTitle || !country || !salary) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const employee = insertEmployee(fullName, jobTitle, country, salary);

  return res.status(201).json(employee);
};

export const getAllEmployees = (req: Request, res: Response) => {
  return res.status(200).json(findAllEmployees());
};

export const getEmployeeById = (req: Request, res: Response) => {
  const { id } = req.params;
  const employee = findEmployeeById(id as string);

  if (!employee) {
    return res.status(404).json({ error: "Employee not found" });
  }

  return res.status(200).json(employee);
};

export const updateEmployee = (req: Request, res: Response) => {
  const { id } = req.params;
  const { fullName, jobTitle, country, salary } = req.body;

  if (!findEmployeeById(id as string)) {
    return res.status(404).json({ error: "Employee not found" });
  }

  const updated = updateEmployeeById(
    id as string,
    fullName,
    jobTitle,
    country,
    salary,
  );

  return res.status(200).json(updated);
};

export const deleteEmployee = (req: Request, res: Response) => {
  const { id } = req.params;
  if (!findEmployeeById(id as string)) {
    return res.status(404).json({ error: "Employee not found" });
  }
  deleteEmployeeById(id as string);
  return res.status(200).json({ message: "Employee deleted successfully" });
};
