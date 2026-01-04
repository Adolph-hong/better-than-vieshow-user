
export interface ApiMovie {
  id: number
  title: string
  posterUrl: string | null
  duration: number 
  genre: string
  rating: string
  releaseDate: string
  endDate: string
  daysUntilRelease?: number
}

export interface HomepageData {
  carousel: ApiMovie[]
  topWeekly: ApiMovie[]
  comingSoon: ApiMovie[]
  recommended: ApiMovie[]
  allMovies: ApiMovie[]
}
export interface ApiResponse<T> {
  success: boolean
  message: string | null
  data: T
  errors: object | null
}

export type HomepageApiResponse = ApiResponse<HomepageData>
