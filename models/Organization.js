import mongoose from "mongoose";

const OrganizationSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Organization name
  registrationNumber: { type: String, unique: true, required: true }, // Unique business registration number
  address: { type: String, required: true }, // Organization's registered address
  contactEmail: { type: String, required: true }, // Official contact email
  contactPhone: { type: String, required: true }, // Contact number
  
  employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }], // List of employee references

  bankDetails: {
    accountNumber: { type: String, required: true }, // Bank account for salary processing
    bankName: { type: String, required: true },
    ifscCode: { type: String, required: true },
  },

  payrollSettings: {
    paymentGateway: { type: String, enum: ["Stripe", "Razorpay", "PayPal"], default:"Stripe", required: true },
    salaryDisbursementDate: { type: Number, default: 30 }, // Day of the month salaries are processed
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Organization = mongoose.model("Organization", OrganizationSchema);
