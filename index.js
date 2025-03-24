import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import employeeRoutes from "./routes/employeeRoutes.js"; 
import orgRoutes from "./routes/orgRoutes.js";
//import payrollRoutes from "./routes/payrollRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
console.log("Employee routes loaded"); // Debugging line

app.use("/api/org", orgRoutes);
app.use("/api/employee", employeeRoutes);
//app.use("/api/payroll", payrollRoutes);

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
