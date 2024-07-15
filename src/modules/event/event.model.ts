import mongoose from "mongoose";
import { Voucher, VoucherSchema } from "../voucher/voucher.model";

export enum EventEditStatus {
  EDITABLE,
  LOCKED,
}

export interface Event {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  date: Date;
  location: string;
  maxQuantity: number;
  quantity: number;
  editStatus: EventEditStatus;
  userEditing?: mongoose.Types.ObjectId;
  expiredEditingDate?: Date;
}

export const EventSchema = new mongoose.Schema<Event>({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  location: { type: String },
  maxQuantity: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 0 },
  editStatus: {
    type: Number,
    required: true,
    default: EventEditStatus.EDITABLE,
  },
  userEditing: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  expiredEditingDate: { type: Date },
});

export const EventModel = mongoose.model<Event>("Event", EventSchema);
