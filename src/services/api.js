const API_BASE_URL = "http://127.0.0.1:8000";

export async function fetchTasks() {
  const response = await fetch(`${API_BASE_URL}/tasks/`);

  if (!response.ok) {
    throw new Error("Failed to load tasks");
  }

  return await response.json();
}

export async function createTask(taskData) {
  const reponse = await fetch(`${API_BASE_URL}/tasks/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });

  if (!reponse.ok) {
    throw new Error("Failed to create task.");
  }

  return await reponse.json();
}
