import express from "express";
import employeeRoutes from "./routes/employee.routes";
import salaryRoutes from "./routes/salary.routes";
import metricsRoutes from "./routes/metrics.routes";

const app = express();
app.use(express.json());
app.use("/employees", employeeRoutes);
app.use("/employees", salaryRoutes);
app.use("/salary", metricsRoutes);

export default app;
