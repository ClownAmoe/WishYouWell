import { cancelTask } from "@/app/api/task.api";
import { useState } from "react";

export const TaskCard = ({ task, onUpdate }: any) => {
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    setLoading(true);
    await cancelTask(task._id);
    onUpdate();
    setLoading(false);
  };

  return (
    <div style={{ border: "1px solid black", margin: 5, padding: 5 }}>
      <h3>Task {task._id}</h3>
      <p>Status: {task.status}</p>
      <p>Progress: {task.progress}%</p>
      <button
        onClick={handleCancel}
        disabled={
          loading || task.status === "done" || task.status === "cancelled"
        }
      >
        Cancel
      </button>
    </div>
  );
};
