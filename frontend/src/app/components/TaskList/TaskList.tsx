"use client";

import { useEffect, useState } from "react";
import { getTasks, cancelTask } from "@/app/api/task.api"; // додай cancelTask
import { CreateTaskForm } from "../CreateTaskForm/CreateTaskForm";

export const TaskList = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const sortTasks = (tasks: any[]) => {
    const order = ["in-progress", "pending", "done"];
    return [...tasks].sort((a, b) => {
      const normalize = (s: string) => s.toLowerCase().replace("_", "-").trim();
      const statusA = normalize(a.status);
      const statusB = normalize(b.status);

      const orderA = order.indexOf(statusA);
      const orderB = order.indexOf(statusB);

      if (orderA === -1) return 1;
      if (orderB === -1) return -1;

      if (statusA === "in-progress" && statusB === "in-progress") {
        return (b.progress ?? 0) - (a.progress ?? 0);
      }

      if (orderA === orderB) {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }

      return orderA - orderB;
    });
  };

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(sortTasks(data));
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    const interval = setInterval(fetchTasks, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleCancel = async (taskId: string) => {
    try {
      const success = await cancelTask(taskId);
      if (success) {
        setTasks((prev) =>
          prev.map((t) =>
            t._id === taskId ? { ...t, status: "cancelled", progress: 0 } : t
          )
        );
      }
    } catch (err) {
      console.error("Failed to cancel task:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800">My Tasks</h1>
          <p className="text-gray-500 mt-2">
            Keep track of all your tasks in one place
          </p>
          <CreateTaskForm onTaskCreated={fetchTasks} />
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64 text-gray-500">
            Loading tasks...
          </div>
        ) : tasks.length === 0 ? (
          <div className="flex justify-center items-center h-64 text-gray-400">
            No tasks available
          </div>
        ) : (
          <main className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow duration-200"
              >
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  {task.cards.join(", ")}
                </h2>

                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${
                      task.status === "done"
                        ? "bg-green-500"
                        : task.status === "in-progress"
                          ? "bg-blue-500"
                          : task.status === "cancelled"
                            ? "bg-red-500"
                            : "bg-yellow-400"
                    }`}
                    style={{ width: `${task.progress ?? 0}%` }}
                  ></div>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <span
                    className={`text-sm font-medium ${
                      task.status === "done"
                        ? "text-green-500"
                        : task.status === "in-progress"
                          ? "text-blue-500"
                          : task.status === "cancelled"
                            ? "text-red-500"
                            : "text-yellow-500"
                    }`}
                  >
                    {task.status}
                  </span>
                  <p className="text-black text-md">Server: {task.server}</p>
                  {task.status !== "done" && task.status !== "cancelled" && (
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                      onClick={() => handleCancel(task._id)}
                    >
                      Cancel
                    </button>
                  )}
                </div>

                {task.status === "done" && task.result && (
                  <div className="mt-2 p-4 bg-gray-50 border rounded">
                    {task.result.map((text: string, i: number) => (
                      <p key={i} className="text-gray-700 mb-2 last:mb-0">
                        {text}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </main>
        )}
      </div>
    </div>
  );
};
