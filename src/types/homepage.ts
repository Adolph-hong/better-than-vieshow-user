// API 回應的電影資料格式
export interface ApiMovie {
  id: number
  title: string
  posterUrl: string | null
  duration: number // 分鐘
  genre: string
  rating: string
  releaseDate: string // ISO date string
  endDate: string // ISO date string
}

// 首頁 API 回應的 data 結構
export interface HomepageData {
  carousel: ApiMovie[]
  topWeekly: ApiMovie[]
  comingSoon: ApiMovie[]
  recommended: ApiMovie[]
  allMovies: ApiMovie[]
}

// API 標準回應格式
export interface ApiResponse<T> {
  success: boolean
  message: string | null
  data: T
  errors: object | null
}

// 首頁 API 回應類型
export type HomepageApiResponse = ApiResponse<HomepageData>

