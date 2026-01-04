import type { ApiResponse, ApiMovie } from "@/types/homepage"
import sendAPI from "@/utils/sendAPI"

/**
 */
export type SearchMoviesApiResponse = ApiResponse<ApiMovie[] | null>

/**
 * @param keyword 搜尋關鍵字（必填，至少1個字元）
 * @returns Promise<SearchMoviesApiResponse>
 */
export const searchMovies = async (keyword: string): Promise<SearchMoviesApiResponse> => {
  if (!keyword || keyword.trim().length === 0) {
    throw new Error("搜尋關鍵字不能為空")
  }

  const response = await sendAPI(
    `/api/movies/search?keyword=${encodeURIComponent(keyword.trim())}`,
    "GET"
  )
  
  if (!response.ok) {
    throw new Error(`API 請求失敗: ${response.status} ${response.statusText}`)
  }
  
  const data: SearchMoviesApiResponse = await response.json()
  return data
}

