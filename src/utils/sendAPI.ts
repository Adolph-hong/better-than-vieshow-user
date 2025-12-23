import { API_BASE_URL } from "@/config/api"

const sendAPI = async (url: string, method: string = "GET", body: unknown = undefined) => {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  return response
}

export default sendAPI
