import db from "./database";

export const getSalaryMetricsByCountry = (country: string) => {
  return db
    .prepare(
      `SELECT 
        MIN(salary) as min,
        MAX(salary) as max,
        AVG(salary) as average
       FROM employees
       WHERE country = ?`,
    )
    .get(country) as { min: number; max: number; average: number } | undefined;
};

export const getAverageSalaryByJobTitle = (jobTitle: string) => {
  return db
    .prepare(
      `SELECT 
        AVG(salary) as average
       FROM employees
       WHERE jobTitle = ?`,
    )
    .get(jobTitle) as { average: number } | undefined;
};

export const countEmployeesByCountry = (country: string): number => {
  const result = db
    .prepare("SELECT COUNT(*) as count FROM employees WHERE country = ?")
    .get(country) as { count: number };
  return result.count;
};

export const countEmployeesByJobTitle = (jobTitle: string): number => {
  const result = db
    .prepare("SELECT COUNT(*) as count FROM employees WHERE jobTitle = ?")
    .get(jobTitle) as { count: number };
  return result.count;
};
