import express from "express";
import employeeRoutes from "./routes/employee.routes";
import salaryRoutes from "./routes/salary.routes";

const app = express();
app.use(express.json());
app.use("/employees", employeeRoutes);
app.use("/employees", salaryRoutes);

export default app;
