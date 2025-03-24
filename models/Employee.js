import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
  organizationId: { type: mongoose.Schema.Types.ObjectId, ref: "Organization", required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true },
  reportingManagerId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  teamLeadId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  salary: { type: Number, required: true },
  bankAccount: { type: String, required: true },
});

const Employee = mongoose.model("Employee", EmployeeSchema);
export default Employee;
