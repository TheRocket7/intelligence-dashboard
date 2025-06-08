import type { IDData } from "../types/idData";
import type { IDLog } from "../types/idLog";

const API_BASE_URL = "http://localhost:5000/api";

/**
 * Generic function for making API requests.
 * @param {string} endpoint - The API endpoint (e.g., '/Company').
 * @param {object} options - Fetch options (method, headers, body, etc.).
 * @returns {Promise<any>} - The API response data.
 */
async function apiRequest(endpoint: string, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Try parsing JSON only if there's content
    const contentLength = response.headers.get("Content-Length");
    if (contentLength && parseInt(contentLength) === 0) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error("API request error: ", error);
    throw error;
  }
}

export async function logIn(body: { username: string; password: string }) {
  const content_ = JSON.stringify(body);
  try {
    const logInUser = await apiRequest(`/users/login`, {
      method: "POST",
      body: content_,
    });
    return logInUser;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export async function getReports() {
  try {
    const reports = await apiRequest(`/data`, {
      method: "GET",
      headers: {
        Accept: "text/plain",
      },
    });
    return reports;
  } catch (error) {
    console.error("Get reports error:", error);
    throw error;
  }
}

export async function getReportsWithQuery(query: string) {
  try {
    const reports = await apiRequest(`/data/search?q=${query}`, {
      method: "GET",
      headers: {
        Accept: "text/plain",
      },
    });
    return reports;
  } catch (error) {
    console.error("Get reports error:", error);
    throw error;
  }
}

export async function addReport(body: IDData) {
  const content_ = JSON.stringify(body);
  try {
    const report = await apiRequest(`/data`, {
      method: "POST",
      body: content_,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return report;
  } catch (error) {
    console.error("Error add new report to the base:", error);
    throw error;
  }
}

export async function addReportBulk(body: IDData[]) {
  const content_ = JSON.stringify(body);
  try {
    const report = await apiRequest(`/data/bulk`, {
      method: "POST",
      body: content_,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return report;
  } catch (error) {
    console.error("Error add new report to the base:", error);
    throw error;
  }
}

export async function updateReport(body: IDData) {
  const content_ = JSON.stringify(body);
  try {
    const report = await apiRequest(`/data/${body.id?.toString()}`, {
      method: "PUT",
      body: content_,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return report;
  } catch (error) {
    console.error("Error editing report in the base:", error);
    throw error;
  }
}

export async function deleteReport(id: number) {
  try {
    const report = await apiRequest(`/data/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "text/plain",
      },
    });
    return report;
  } catch (error) {
    console.error("Error delete report from base:", error);
    throw error;
  }
}

export async function addLog(body: IDLog) {
  const content_ = JSON.stringify(body);
  try {
    const log = await apiRequest(`/logs`, {
      method: "POST",
      body: content_,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return log;
  } catch (error) {
    console.error("Error add new log to the base:", error);
    throw error;
  }
}

export async function askAI(instruction: string, prompt: string) {
  try {
    const res = await fetch("http://localhost:5000/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ instruction, prompt }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error add new log to the base:", error);
    throw error;
  }
}
