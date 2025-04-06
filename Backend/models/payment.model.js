import mongoose from "mongoose";

const PaymentSchema = mongoose.Schema(
  {
    name: String,
    phone: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { String: Number, required: true },
    method: { String: Number, required: true },
    note: String,
  },
  { timeStamp: true }
);

export default mongoose.model("Payment", PaymentSchema);
