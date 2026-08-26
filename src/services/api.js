const API_BASE_URL = "http://127.0.0.1:8000";

async function getErrorMessage(response, fallbackMessage) {
  try {
    const data = await response.json();
    return data.detail || fallbackMessage;
  } catch {
    return fallbackMessage;
  }
}

function getAuthHeaders() {
  const token = localStorage.getItem("access_token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export function isAuthenticated() {
  return Boolean(localStorage.getItem("access_token"));
}

export async function loginUser(loginData) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      "Invalid email or password",
    );

    throw new Error(message);
  }

  return response.json();
}

export function logoutUser() {
  localStorage.removeItem("access_token");
}

export async function fetchTasks() {
  const response = await fetch(`${API_BASE_URL}/tasks/`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const message = await getErrorMessage(response, "Failed to load tasks.");

    throw new Error(message);
  }

  return await response.json();
}

export async function createTask(taskData) {
  const response = await fetch(`${API_BASE_URL}/tasks/`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    const message = await getErrorMessage(response, "Failed to create task.");
    throw new Error(message);
  }

  return await response.json();
}

export async function updateTask(taskId, taskData) {
  const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(taskData),
  });

  if (response.status === 401) {
    logoutUser();
    throw new Error("Your session has expired. Please log in again.");
  }

  if (!response.ok) {
    const message = await getErrorMessage(response, "Failed to update task");

    throw new Error(message);
  }

  return await response.json();
}

export async function deleteTask(taskId) {
  const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (response.status === 401) {
    logoutUser();
    throw new Error("Your session has expired. Please log in again.");
  }

  if (!response.ok) {
    const message = await getErrorMessage(response, "Failed to delete task.");

    throw new Error(message);
  }

  return await response.json();
}
