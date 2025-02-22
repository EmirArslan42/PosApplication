const mongoose = require("mongoose");

const BillSchema = mongoose.Schema(
  {
    customerName: { type: String, require: true },
    customerPhoneNumber: { type: String, require: true },
    paymentMode: { type: String, require: true },
    cardItems: { type: Array, require: true },
    subtotal: { type: Number, require: true },
    tax: { type: Number, require: true },
    totalAmount: { type: Number, require: true },

  },
  {
    timestamps: true,
  }
);

const Bill = mongoose.model("bills", BillSchema);
module.exports=Bill;
