import mongoose from "mongoose";


export interface Voucher {
  _id: mongoose.Schema.Types.ObjectId;
  code: string;
  discount: number;
  userId: mongoose.Schema.Types.ObjectId;
  eventId: mongoose.Schema.Types.ObjectId;
}

export const VoucherSchema = new mongoose.Schema<Voucher>({
  code: { type: String, required: true, unique: true },
  discount: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
});

export const VoucherModel = mongoose.model<Voucher>("Voucher", VoucherSchema);
