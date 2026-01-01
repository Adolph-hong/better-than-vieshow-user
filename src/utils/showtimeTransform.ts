import type {
  AvailableDatesApiResponse,
  DateOption,
  MovieDetails,
  MovieDetailsApiResponse,
  MovieShowtimeData,
  ShowtimeGroup,
  ShowtimesApiResponse,
} from "@/types/showtime"

/**
 * 格式化電影時長
 * @param minutes 分鐘數
 * @returns 格式化後的時長字串，例如 "192分鐘"
 */
const formatDuration = (minutes: number): string => `${minutes}分鐘`

/**
 * 分割類型字串
 * @param genreString 類型字串，例如 "SciFi,Action,Adventure"
 * @returns 類型陣列
 */
const splitGenres = (genreString: string): string[] =>
  genreString.split(",").map((g) => g.trim())

/**
 * 轉換電影詳細資訊 API 回應為 UI 資料格式
 */
export const transformMovieDetails = (
  apiResponse: MovieDetailsApiResponse
): MovieDetails | null => {
  if (!apiResponse.success || !apiResponse.data) {
    return null
  }

  const { data } = apiResponse

  return {
    movieId: data.movieId,
    title: data.title,
    rating: data.rating,
    duration: formatDuration(data.duration),
    genres: splitGenres(data.genre),
    description: data.description,
    director: data.director,
    cast: data.cast,
    posterUrl: data.posterUrl || "",
    trailerUrl: data.trailerUrl || "",
    releaseDate: data.releaseDate,
  }
}

/**
 * 轉換可訂票日期 API 回應為 UI 資料格式
 */
export const transformAvailableDates = (
  apiResponse: AvailableDatesApiResponse
): DateOption[] => {
  if (!apiResponse.success || !apiResponse.data) {
    return []
  }

  return apiResponse.data.dates.map((dateItem) => ({
    id: dateItem.date,
    date: dateItem.date,
    dayOfWeek: dateItem.dayOfWeek,
  }))
}

/**
 * 轉換場次 API 回應為 UI 資料格式（依影廳類型分組）
 */
export const transformShowtimes = (apiResponse: ShowtimesApiResponse): ShowtimeGroup[] => {
  if (!apiResponse.success || !apiResponse.data) {
    return []
  }

  const { showtimes } = apiResponse.data

  // 依 theaterType 分組
  const groupedByType = showtimes.reduce(
    (acc, showtime) => {
      const { theaterType } = showtime

      if (!acc[theaterType]) {
        acc[theaterType] = []
      }

      acc[theaterType].push(showtime)

      return acc
    },
    {} as Record<string, typeof showtimes>
  )

  // 轉換為 ShowtimeGroup 格式
  return Object.entries(groupedByType).map(([theaterType, sessions]) => ({
    id: theaterType,
    name: sessions[0].theaterName, // 使用第一個場次的影廳名稱
    price: sessions[0].price, // 假設同類型影廳價格相同
    sessions: sessions.map((session) => ({
      id: session.showTimeId.toString(),
      time: session.startTime,
      showTimeId: session.showTimeId,
      endTime: session.endTime,
      availableSeats: session.availableSeats,
      totalSeats: session.totalSeats,
    })),
  }))
}

/**
 * 將 YouTube 網址轉換為嵌入格式 (Embed URL)
 * 支援:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 */
export const getYouTubeEmbedUrl = (url: string | null | undefined): string => {
  if (!url) return ""

  // 如果已經是 embed 格式，直接返回並加上自動播放參數
  if (url.includes("youtube.com/embed/")) {
    const baseUrl = url.split("?")[0]
    return `${baseUrl}?autoplay=1&mute=1`
  }

  let videoId = ""

  // 處理 https://www.youtube.com/watch?v=VIDEO_ID
  if (url.includes("v=")) {
    videoId = url.split("v=")[1].split("&")[0]
  }
  // 處理 https://youtu.be/VIDEO_ID
  else if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1].split("?")[0]
  }

  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`
  }

  return url // 如果無法辨識，原樣返回
}

/**
 * 合併電影詳細資訊與可訂票日期為完整的場次資料
 */
export const mergeMovieShowtimeData = (
  details: MovieDetails | null,
  dates: DateOption[]
): MovieShowtimeData | null => {
  if (!details) {
    return null
  }

  return {
    ...details,
    dates,
  }
}
