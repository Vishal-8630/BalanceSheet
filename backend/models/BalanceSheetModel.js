const mongoose = require("mongoose");

const balanceSheetSchema = new mongoose.Schema({
  lrNo: { type: String, required: true },
  lrDate: { type: Date, required: true },
  vehicleNo: { type: String, required: true },
  vehicleType: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  reportingDate: { type: Date, required: true },
  uploadingDate: { type: Date, required: true },
  podDate: { type: Date, required: true },
  freight: { type: Number, required: true },
  advance: { type: Number, required: true },
  detention: { type: Number, required: true },
  warai: { type: Number, required: true },
  penaltyCharges: { type: Number, required: true },
  balance: { type: Number, required: true },
  totalBalance: { type: Number, required: true },
  tds: { type: Number, required: true },
  payableAmount: { type: Number, required: true }
}, { timestamps: true });

const BalanceSheet = mongoose.model("BalanceSheet", balanceSheetSchema);

module.exports = BalanceSheet;
