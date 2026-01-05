import type { Movie } from "@/components/home/movieListData"
import type { ApiMovie } from "@/types/homepage"
/**
 * 將分鐘轉換為 "X小時" 或 "X分鐘" 格式
 */
export const formatDuration = (minutes: number): string => {
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (mins === 0) {
      return `${hours}小時`
    }
    return `${hours}小時${mins}分鐘`
  }
  return `${minutes}分鐘`
}

/**
 * 將 API 的電影資料轉換為組件需要的格式
 */
export const transformApiMovieToMovie = (apiMovie: ApiMovie): Movie => {
  // 如果 posterUrl 為 null，使用預設圖片或空字串
  // 這裡可以根據實際需求調整
  const poster = apiMovie.posterUrl || ""

  return {
    id: apiMovie.id,
    title: apiMovie.title,
    titleZh: apiMovie.title, // API 回傳的 title 就是中文標題
    genre: apiMovie.genre,
    rating: apiMovie.rating,
    duration: formatDuration(apiMovie.duration),
    poster,
    daysUntilRelease: apiMovie.daysUntilRelease,
  }
}

/**
 * 批量轉換 API 電影資料
 */
export const transformApiMovies = (apiMovies: ApiMovie[] | undefined | null): Movie[] => {
  if (!apiMovies || !Array.isArray(apiMovies)) {
    return []
  }
  return apiMovies.map(transformApiMovieToMovie)
}
