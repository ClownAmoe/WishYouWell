export type TaskStatus = "pending" | "in_progress" | "done" | "cancelled";

export interface ITask extends Document {
  cards: string[];
  status: TaskStatus;
  progress: number;
  result?: string[];
  createdAt: Date;
  updatedAt: Date;
}
