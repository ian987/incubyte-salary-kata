import db from "./database";
import { Employee } from "../types/employee.types";

export const insertEmployee = (
  fullName: string,
  jobTitle: string,
  country: string,
  salary: number,
): Employee => {
  const stmt = db.prepare(
    "INSERT INTO employees (fullName, jobTitle, country, salary) VALUES (?, ?, ?, ?)",
  );
  const result = stmt.run(fullName, jobTitle, country, salary);
  return findEmployeeById(result.lastInsertRowid as number) as Employee;
};

export const findAllEmployees = (): Employee[] => {
  return db.prepare("SELECT * FROM employees").all() as Employee[];
};

export const findEmployeeById = (id: number | string): Employee | undefined => {
  return db.prepare("SELECT * FROM employees WHERE id = ?").get(id) as
    | Employee
    | undefined;
};

export const updateEmployeeById = (
  id: string,
  fullName: string,
  jobTitle: string,
  country: string,
  salary: number,
): Employee => {
  db.prepare(
    "UPDATE employees SET fullName = ?, jobTitle = ?, country = ?, salary = ? WHERE id = ?",
  ).run(fullName, jobTitle, country, salary, id);
  return findEmployeeById(id) as Employee;
};

export const deleteEmployeeById = (id: string): void => {
  db.prepare("DELETE FROM employees WHERE id = ?").run(id);
};
