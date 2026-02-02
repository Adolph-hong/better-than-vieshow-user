// ==================== API Response Types ====================

/**
 * 電影詳細資訊 API 回應
 * GET /api/movies/{id}
 */
export interface MovieDetailsApiResponse {
  success: boolean
  message: string | null
  data: {
    movieId: number
    title: string
    rating: string
    duration: number
    genre: string
    description: string
    director: string
    cast: string
    posterUrl: string | null
    trailerUrl: string | null
    releaseDate: string
    endDate: string
  } | null
  errors: string | null
}

/**
 * 可訂票日期 API 回應
 * GET /api/movies/{id}/available-dates
 */
export interface AvailableDatesApiResponse {
  success: boolean
  message: string | null
  data: {
    movieId: number
    title: string
    rating: string
    duration: number
    genre: string
    posterUrl: string | null
    trailerUrl: string | null
    dates: Array<{
      date: string
      dayOfWeek: string
    }>
  } | null
  errors: string | null
}

/**
 * 場次資訊 API 回應
 * GET /api/movies/{id}/showtimes
 */
export interface ShowtimesApiResponse {
  success: boolean
  message: string | null
  data: {
    movieId: number
    movieTitle: string
    date: string
    showtimes: Array<{
      showTimeId: number
      theaterName: string
      theaterType: string
      startTime: string
      endTime: string
      price: number
      availableSeats: number
      totalSeats: number
    }>
  } | null
  errors: string | null
}

// ==================== Transformed UI Types ====================

/**
 * 電影完整資訊（用於 UI 顯示）
 */
export interface MovieDetails {
  movieId: number
  title: string
  rating: string
  duration: string // 格式化後的時長，例如 "192分鐘"
  genres: string[] // 從 API 的 genre 字串分割而來
  description: string
  director: string
  cast: string
  posterUrl: string
  trailerUrl: string
  releaseDate: string
}

/**
 * 日期選項（用於 UI 顯示）
 */
export interface DateOption {
  id: string // 使用 date 作為 id
  date: string
  dayOfWeek: string
}

/**
 * 場次時段（用於 UI 顯示）
 */
export interface ShowtimeSession {
  id: string // 使用 showTimeId 轉換為字串
  time: string // startTime
  showTimeId: number
  endTime: string
  availableSeats: number
  totalSeats: number
}

/**
 * 場次分組（依影廳類型分組）
 */
export interface ShowtimeGroup {
  id: string // 使用 theaterType 作為 id
  name: string // theaterName
  price: number
  sessions: ShowtimeSession[]
}

/**
 * 完整的電影場次資料（用於 MovieShowtime 頁面）
 */
export interface MovieShowtimeData {
  movieId: number
  title: string
  rating: string
  duration: string
  genres: string[]
  description: string
  director: string
  cast: string
  posterUrl: string
  trailerUrl: string
  releaseDate: string
  dates: DateOption[]
}
