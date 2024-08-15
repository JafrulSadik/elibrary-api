import mongoose from "mongoose";
import { Counter } from "../types";

const counterSchema = new mongoose.Schema<Counter>({
  modelName: { type: String, required: true, unique: true },
  seq: { type: Number, default: 0 },
});

export default mongoose.model<Counter>("Counter", counterSchema);
