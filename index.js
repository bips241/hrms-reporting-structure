import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import employeeRoutes from "./routes/employeeRoutes.js"; 
import orgRoutes from "./routes/orgRoutes.js";
import payrollRoute from "./routes/PayrollRoute.js";
import cron from "node-cron";

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
app.use("/api/payroll", payrollRoute);

// Schedule Payroll Processing on the 28th of every month at 9 AM
cron.schedule("43 9 28 * *", async () => {
  console.log("🔄 Running scheduled payroll processing...");

  try {
    const response = await fetch("http://localhost:5000/api/payroll/run", {
      method: "POST",
    });

    const data = await response.json();
    console.log("Payroll response:", data);

    console.log("✅ Payroll processed successfully:", response.data);
  } catch (error) {
    console.error("❌ Payroll processing failed:", error.response?.data || error.message);
  }
});

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
