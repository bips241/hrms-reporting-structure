import express from "express";
import Employee from "../models/Employee.js";

const router = express.Router();

//TEST ROUTE

router.get("/test", async (req, res) => {
  console.log("Test route hit");
  res.json({ message: "Test route is healthy" });
});

// Create Employee
router.post("/create-emp", async (req, res) => {
  try {
    console.log(req.body);
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json({ message: "Employee created successfully", employee });
  } catch (error) {
    res.status(500).json({ error: "Failed to create employee" });
  }
});

// Assign Reporting Manager
router.put("/api/employee/assign-manager", async (req, res) => {
  const { employeeId, managerId } = req.body;

  try {
    await Employee.findByIdAndUpdate(employeeId, { reportingManagerId: managerId });
    res.status(200).json({ message: "Reporting manager assigned successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to assign manager." });
  }
});

// Assign Team Lead
router.put("/assign-team-lead", async (req, res) => {
  const { employeeId, teamLeadId } = req.body;

  try {
    await Employee.findByIdAndUpdate(employeeId, { teamLeadId });
    res.status(200).json({ message: "Team lead assigned successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to assign team lead." });
  }
});





export default router;
