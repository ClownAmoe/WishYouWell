"use client";

import { useEffect, useState } from "react";
import { createTask } from "@/app/api/task.api";
import { getCards } from "@/app/api/cards.api";

interface Props {
  onTaskCreated: () => void;
}

export const CreateTaskForm = ({ onTaskCreated }: Props) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [cardsList, setCardsList] = useState<string[]>([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await getCards();

        // 🔥 НОРМАЛІЗУЄМО ДАНІ
        const list = Array.isArray(data)
          ? data.map((item: any) =>
              typeof item === "string"
                ? item
                : item?.name || item?.card || item?.id || ""
            )
          : [];

        setCardsList(list.filter(Boolean));
      } catch (err) {
        console.error("Failed to fetch cards:", err);
      }
    };

    fetchCards();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const cards = input
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);

    const invalid = cards.filter((c) => !cardsList.includes(c));

    if (invalid.length > 0) {
      setError(`Invalid cards: ${invalid.join(", ")}`);
      return;
    }

    try {
      await createTask(cards);
      setInput("");
      onTaskCreated();
    } catch (err) {
      console.error("Failed to create task:", err);
      setError("Failed to create task");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter cards separated by comma"
        className="border px-3 py-2 rounded w-full max-w-md text-black border-gray-500"
      />

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Create Task
      </button>
    </form>
  );
};
