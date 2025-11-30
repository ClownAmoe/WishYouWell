"use client";

import { CreateTaskForm } from "../components/CreateTaskForm/CreateTaskForm";
import { TaskList } from "../components/TaskList/TaskList";

export default function Dashboard() {
  return (
    <div>
      <TaskList />
    </div>
  );
}
