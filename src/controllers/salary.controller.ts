import { Request, Response } from "express";
import { findEmployeeById } from "../db/employee.repository";
import { getDeductionRate } from "../utils/deduction";
import { Employee } from "../types/employee.types";

export const calculateSalary = (req: Request, res: Response) => {
  const { id } = req.params;
  const employee: Employee | undefined = findEmployeeById(id as string);

  if (!employee) {
    return res.status(404).json({ error: "Employee not found" });
  }

  const grossSalary = employee.salary;
  const deduction = grossSalary * getDeductionRate(employee.country);
  const netSalary = grossSalary - deduction;

  return res.status(200).json({
    grossSalary,
    deduction,
    netSalary,
  });
};
