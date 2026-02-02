import type {
  AvailableDatesApiResponse,
  MovieDetailsApiResponse,
  ShowtimesApiResponse,
} from "@/types/showtime"
import sendAPI from "@/utils/sendAPI"

/**
 * 取得電影完整詳細資訊
 * @param movieId 電影 ID
 * @returns Promise<MovieDetailsApiResponse>
 */
export const getMovieDetails = async (movieId: number): Promise<MovieDetailsApiResponse> => {
  const response = await sendAPI(`/api/movies/${movieId}`, "GET")

  if (!response.ok) {
    throw new Error(`API 請求失敗: ${response.status} ${response.statusText}`)
  }

  const data: MovieDetailsApiResponse = await response.json()
  return data
}

/**
 * 取得電影可訂票日期
 * @param movieId 電影 ID
 * @returns Promise<AvailableDatesApiResponse>
 */
export const getMovieAvailableDates = async (
  movieId: number
): Promise<AvailableDatesApiResponse> => {
  const response = await sendAPI(`/api/movies/${movieId}/available-dates`, "GET")

  if (!response.ok) {
    throw new Error(`API 請求失敗: ${response.status} ${response.statusText}`)
  }

  const data: AvailableDatesApiResponse = await response.json()
  return data
}

/**
 * 取得電影場次資訊
 * @param movieId 電影 ID
 * @param date 日期 (格式: YYYY-MM-DD)
 * @returns Promise<ShowtimesApiResponse>
 */
export const getMovieShowtimes = async (
  movieId: number,
  date: string
): Promise<ShowtimesApiResponse> => {
  const response = await sendAPI(`/api/movies/${movieId}/showtimes?date=${date}`, "GET")

  if (!response.ok) {
    throw new Error(`API 請求失敗: ${response.status} ${response.statusText}`)
  }

  const data: ShowtimesApiResponse = await response.json()
  return data
}
