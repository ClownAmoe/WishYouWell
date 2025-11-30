const API_URL = "http://localhost:3000";

export async function getTasks() {
  const res = await fetch(`${API_URL}/tasks`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}

export async function createTask(cards: string[]) {
  const res = await fetch(`${API_URL}/tasks/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ cards }),
  });
  if (!res.ok) throw new Error("Failed to create task");
  return res.json();
}

export async function cancelTask(taskId: string) {
  const res = await fetch(`${API_URL}/tasks/${taskId}/cancel`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!res.ok) throw new Error("Failed to cancel task");
  return res.json();
}
