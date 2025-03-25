import express from "express";
import mongoose from "mongoose";
import Employee from "../models/Employee.js";
import Payroll from "../models/Payroll.js";
import Stripe from "stripe";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/run", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const employees = await Employee.find().session(session);
    if (!employees.length) {
      await session.abortTransaction();
      return res.status(404).json({ error: "No employees found for payroll processing." });
    }

    let payrollRecords = [];

    for (const employee of employees) {
      const workingHours = Math.floor(Math.random() * (30 - 10 + 1)) + 10; // Random hours (10-30) for demo, original hours should be fetched from module 4 api
      const hourlyRate = employee.salary; // Assume hourly rate is salary
      const amountToPay = Math.round(workingHours * hourlyRate / 100); // Convert to cents

      // Process payment using Stripe (Test mode)
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountToPay,
        currency: "usd",
        payment_method_types: ["card"],
        metadata: {
          employeeId: employee._id.toString(),
          workingHours: workingHours,
        },
      });

      // Save payroll record
      const payroll = new Payroll({
        employeeId: employee._id,
        organizationId: employee.organizationId,
        workingHours,
        amountPaid: amountToPay / 100,
        transactionId: paymentIntent.id,
        status: "Processed",
      });

      await payroll.save({ session });
      payrollRecords.push(payroll);
    }

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: "Payroll processed successfully", payrollRecords });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    res.status(500).json({ error: "Payroll processing failed" });
  }
});

export default router;
