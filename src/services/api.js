const API_BASE_URL = "http://127.0.0.1:8000";

async function getErrorMessage(response, fallbackMessage) {
  try {
    const data = await response.json();
    return data.detail || fallbackMessage;
  } catch {
    return fallbackMessage;
  }
}

export async function fetchTasks() {
  const response = await fetch(`${API_BASE_URL}/tasks/`);

  if (!response.ok) {
    const message = await getErrorMessage(response, "Failed to load tasks.");

    throw new Error(message);
  }

  return await response.json();
}

export async function createTask(taskData) {
  const response = await fetch(`${API_BASE_URL}/tasks/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    const message = await getErrorMessage(response, "Failed to create task.");
    throw new Error(message);
  }

  return await response.json();
}
