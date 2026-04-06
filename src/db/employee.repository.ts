import db from "./database";

export const insertEmployee = (
  fullName: string,
  jobTitle: string,
  country: string,
  salary: number,
) => {
  const stmt = db.prepare(
    "INSERT INTO employees (fullName, jobTitle, country, salary) VALUES (?, ?, ?, ?)",
  );
  const result = stmt.run(fullName, jobTitle, country, salary);
  return findEmployeeById(result.lastInsertRowid as number);
};

export const findAllEmployees = () => {
  return db.prepare("SELECT * FROM employees").all();
};

export const findEmployeeById = (id: number | string) => {
  return db.prepare("SELECT * FROM employees WHERE id = ?").get(id);
};

export const updateEmployeeById = (
  id: string,
  fullName: string,
  jobTitle: string,
  country: string,
  salary: number,
) => {
  db.prepare(
    "UPDATE employees SET fullName = ?, jobTitle = ?, country = ?, salary = ? WHERE id = ?",
  ).run(fullName, jobTitle, country, salary, id);
  return findEmployeeById(id);
};

export const deleteEmployeeById = (id: string) => {
  db.prepare("DELETE FROM employees WHERE id = ?").run(id);
};
