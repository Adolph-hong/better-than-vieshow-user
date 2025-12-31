import sendAPI from "@/utils/sendAPI"
import type { HomepageApiResponse } from "@/types/homepage"

/**
 * 取得首頁電影資料
 * @returns Promise<HomepageApiResponse>
 */
export const getHomepageMovies = async (): Promise<HomepageApiResponse> => {
  const response = await sendAPI("/api/movies/homepage", "GET")
  
  if (!response.ok) {
    throw new Error(`API 請求失敗: ${response.status} ${response.statusText}`)
  }
  
  const data: HomepageApiResponse = await response.json()
  return data
}

