import express from "express";
import { Organization } from "../models/Organization.js";

const router = express.Router();

router.post("/create-org", async (req, res) => {
  try {
    const org = new Organization(req.body);
    await org.save();
    res.status(201).json({ message: "Organization created successfully", org });
  } catch (error) {
    res.status(500).json({ error: "Failed to create organization" });
  }
});

export default router;
