import { Schema, model, Document, Types } from "mongoose";
import { ITask } from "../types/task";

export interface TaskDocument extends ITask, Document {
  _id: Types.ObjectId;
  result: string[];
  user: Schema.Types.ObjectId;
  server: string;
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
    result: { type: [String], default: [] },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    server: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<TaskDocument>("Task", taskSchema);
