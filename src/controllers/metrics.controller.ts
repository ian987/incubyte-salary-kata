import { Request, Response } from "express";
import {
  getSalaryMetricsByCountry,
  getAverageSalaryByJobTitle,
  countEmployeesByCountry,
  countEmployeesByJobTitle,
} from "../db/metrics.repository";

const handleCountryMetrics = (country: string, res: Response) => {
  if (countEmployeesByCountry(country) === 0) {
    return res
      .status(404)
      .json({ error: `No employees found for country: ${country}` });
  }
  const metrics = getSalaryMetricsByCountry(country);
  return res.status(200).json({
    country,
    min: metrics?.min,
    max: metrics?.max,
    average: metrics?.average,
  });
};

const handleJobTitleMetrics = (jobTitle: string, res: Response) => {
  if (countEmployeesByJobTitle(jobTitle) === 0) {
    return res
      .status(404)
      .json({ error: `No employees found for job title: ${jobTitle}` });
  }
  const metrics = getAverageSalaryByJobTitle(jobTitle);
  return res.status(200).json({
    jobTitle,
    average: metrics?.average,
  });
};

export const getSalaryMetrics = (req: Request, res: Response) => {
  const { country, jobTitle } = req.query;

  if (!country && !jobTitle) {
    return res.status(400).json({
      error: "Please provide either country or jobTitle query parameter",
    });
  }

  if (country) return handleCountryMetrics(country as string, res);
  if (jobTitle) return handleJobTitleMetrics(jobTitle as string, res);
};
