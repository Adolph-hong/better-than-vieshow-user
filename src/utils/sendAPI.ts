import { API_BASE_URL } from "@/config/api"

const sendAPI = async (url: string, method: string = "GET", body: unknown = undefined) => {
  if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL 環境變數未設置")
  }

  const fullUrl = `${API_BASE_URL}${url}`
  const response = await fetch(fullUrl, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  return response
}

export default sendAPI
