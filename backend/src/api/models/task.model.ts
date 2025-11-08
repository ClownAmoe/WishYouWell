import { Schema, model, Document, Types } from "mongoose";
import { ITask } from "../types/task";

export interface TaskDocument extends ITask, Document {
  _id: Types.ObjectId;
}

const taskSchema = new Schema<TaskDocument>(
  {
    cards: { type: [String], required: true },
    status: {
      type: String,
      enum: ["pending", "in_progress", "done", "cancelled"],
      default: "pending",
    },
    progress: { type: Number, default: 0 },
    result: { type: String, default: "" },
  },
  { timestamps: true }
);

export default model<TaskDocument>("Task", taskSchema);
