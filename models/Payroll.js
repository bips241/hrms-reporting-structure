import mongoose from "mongoose";

const PayrollSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    workingHours: {
      type: Number,
      required: true,
      min: 10,
      max: 30,
    },
    amountPaid: {
      type: Number,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Processed", "Failed"],
      default: "Processed",
    },
  },
  { timestamps: true }
);

const Payroll = mongoose.model("Payroll", PayrollSchema);
export default Payroll;
