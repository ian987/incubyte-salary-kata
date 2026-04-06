import { Request, Response } from "express";
import {
  getSalaryMetricsByCountry,
  getAverageSalaryByJobTitle,
  countEmployeesByCountry,
  countEmployeesByJobTitle,
} from "../db/metrics.repository";

export const getSalaryMetrics = (req: Request, res: Response) => {
  const { country, jobTitle } = req.query;

  if (!country && !jobTitle) {
    return res.status(400).json({
      error: "Please provide either country or jobTitle query parameter",
    });
  }

  if (country) {
    const countryStr = country as string;

    if (countEmployeesByCountry(countryStr) === 0) {
      return res.status(404).json({
        error: `No employees found for country: ${countryStr}`,
      });
    }

    const metrics = getSalaryMetricsByCountry(countryStr);
    return res.status(200).json({
      country: countryStr,
      min: metrics?.min,
      max: metrics?.max,
      average: metrics?.average,
    });
  }

  if (jobTitle) {
    const jobTitleStr = jobTitle as string;

    if (countEmployeesByJobTitle(jobTitleStr) === 0) {
      return res.status(404).json({
        error: `No employees found for job title: ${jobTitleStr}`,
      });
    }

    const metrics = getAverageSalaryByJobTitle(jobTitleStr);
    return res.status(200).json({
      jobTitle: jobTitleStr,
      average: metrics?.average,
    });
  }
};
