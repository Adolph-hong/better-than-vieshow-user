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
const formatDuration = (minutes: number): string => {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${h}小時 ${m}分鐘`
}

/**
 * 將日期格式轉換為 MM/DD (移除年份)
 * @param dateString 日期字串，例如 "2023-10-25"
 * @returns 格式化後的日期，例如 "10/25"
 */
const formatDateToMMDD = (dateString: string): string => {
  if (!dateString) return ""
  const match = dateString.match(/(\d{2})-(\d{2})$/)
  if (match) {
    return `${match[1]}/${match[2]}`
  }
  return dateString
}

/**
 * 將 24 小時制時間轉換為含上午/中午/下午的 12 小時制
 * @param timeString 時間字串，例如 "14:00"
 * @returns 格式化後的時間，例如 "下午2:00"
 */
const formatTimeTo12H = (timeString: string): string => {
  if (!timeString) return ""
  const [hoursStr, minutesStr] = timeString.split(":")
  const hours = parseInt(hoursStr, 10)
  const minutes = minutesStr

  let period = ""
  let hour12 = hours

  if (hours < 12) {
    period = "上午"
    hour12 = hours === 0 ? 12 : hours
  } else if (hours === 12) {
    period = "中午"
    hour12 = 12
  } else {
    period = "下午"
    hour12 = hours - 12
  }

  return `${period}${hour12}:${minutes}`
}

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
    date: formatDateToMMDD(dateItem.date),
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
    name: theaterType, // 將影廳類型（如 2D, IMAX）作為分組名稱顯示
    price: sessions[0].price, // 假設同類型影廳價格相同
    sessions: sessions.map((session) => ({
      id: session.showTimeId.toString(),
      time: formatTimeTo12H(session.startTime),
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
