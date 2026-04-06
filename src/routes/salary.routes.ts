import { Router } from "express";
import { calculateSalary } from "../controllers/salary.controller";

const router = Router();

router.get("/:id/salary", calculateSalary);

export default router;
