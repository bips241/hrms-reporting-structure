import express from "express";
import Employee from "../models/Employee.js";
import Organization from "../models/Organization.js";
import mongoose from "mongoose";

const router = express.Router();

//TEST ROUTE

router.get("/test", async (req, res) => {
  console.log("Test route hit");
  res.json({ message: "Test route is healthy" });
});

// Create Employee
router.post("/create-emp", async (req, res) => {
  try {
    const { organizationId, name, role, salary, bankAccount } = req.body;

    // Check if organization exists
    const organization = await Organization.findById(organizationId);
    if (!organization) {
      return res.status(400).json({ error: "Invalid organizationId. Organization not found." });
    }

    const email = `${name.split(" ").join("").toLowerCase()}@${organization.name.split(" ")[0].toLowerCase()}.com`;

    // Create and save employee
    const employee = await Employee.create({
      organizationId,
      name,
      email,
      role,
      salary,
      bankAccount,
    });

    res.status(201).json({ message: "Employee created successfully", employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create employee" });
  }
});




// Assign Reporting Manager
router.put("/assign-manager", async (req, res) => {
  try {
    const { employeeId, reportingManagerId } = req.body;

    const employee = await Employee.findById(employeeId);
    const manager = await Employee.findById(reportingManagerId);

    if (!employee || !manager) {
      return res.status(404).json({ error: "Employee or Reporting Manager not found" });
    }

    employee.reportingManagerId = reportingManagerId;
    await employee.save();

    res.json({ message: "Reporting Manager assigned successfully", employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to assign Reporting Manager" });
  }
});



// Assign Team Lead
router.put("/assign-team-lead", async (req, res) => {
  try {
    const { employeeId, teamLeadId } = req.body;

    const employee = await Employee.findById(employeeId);
    const teamLead = await Employee.findById(teamLeadId);

    if (!employee || !teamLead) {
      return res.status(404).json({ error: "Employee or Team Lead not found" });
    }

    employee.teamLeadId = teamLeadId;
    await employee.save();

    res.json({ message: "Team Lead assigned successfully", employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to assign Team Lead" });
  }
});





export default router;
