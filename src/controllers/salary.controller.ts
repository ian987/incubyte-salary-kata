import { Request, Response } from "express";
import { findEmployeeById } from "../db/employee.repository";

const getDeductionRate = (country: string): number => {
  switch (country) {
    case "India":
      return 0.1;
    case "United States":
      return 0.12;
    default:
      return 0;
  }
};

export const calculateSalary = (req: Request, res: Response) => {
  const { id } = req.params;
  const employee = findEmployeeById(id as string) as any;

  if (!employee) {
    return res.status(404).json({ error: "Employee not found" });
  }

  const grossSalary = employee.salary;
  const deductionRate = getDeductionRate(employee.country);
  const deduction = grossSalary * deductionRate;
  const netSalary = grossSalary - deduction;

  return res.status(200).json({
    grossSalary,
    deduction,
    netSalary,
  });
};
