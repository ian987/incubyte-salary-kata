import { Router } from "express";
import { getSalaryMetrics } from "../controllers/metrics.controller";

const router = Router();

router.get("/metrics", getSalaryMetrics);

export default router;
