import { API_BASE_URL } from "@/config/api"

const sendAPI = async (
  url: string,
  method: string = "GET",
  body: unknown = undefined,
  needAuth = false
) => {
  const token = localStorage.getItem("token")
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }

  if (needAuth && token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })
  return response
}

export default sendAPI
