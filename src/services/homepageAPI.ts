import type { HomepageApiResponse } from "@/types/homepage"
import sendAPI from "@/utils/sendAPI"

/**
 * 取得首頁電影資料
 * @returns Promise<HomepageApiResponse>
 */
// eslint-disable-next-line import/prefer-default-export
export const getHomepageMovies = async (): Promise<HomepageApiResponse> => {
  const response = await sendAPI("/api/movies/homepage", "GET")

  if (!response.ok) {
    const text = await response.text()
    throw new Error(
      `API 請求失敗: ${response.status} ${response.statusText}. 回應內容: ${text.substring(0, 100)}`
    )
  }

  const contentType = response.headers.get("content-type")
  if (!contentType || !contentType.includes("application/json")) {
    const text = await response.text()
    throw new Error(
      `API 返回了非 JSON 格式的資料。Content-Type: ${contentType}. 回應內容: ${text.substring(0, 200)}`
    )
  }

  const data: HomepageApiResponse = await response.json()
  return data
}
