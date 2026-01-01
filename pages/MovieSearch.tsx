import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import type { Movie } from "@/components/home/movieListData"
import Footer from "@/components/shared/Footer"
import { getHomepageMovies } from "@/services/homepageAPI"
import { searchMovies } from "@/services/searchAPI"
import { transformApiMovies } from "@/utils/movieTransform"

const MAX_QUERY_LENGTH = 700

const MovieSearch = () => {
  const [query, setQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Movie[]>([])
  const [randomRecommendMovies, setRandomRecommendMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const trimmedQuery = query.trim()

  useEffect(() => {
    const fetchRandomRecommend = async () => {
      try {
        const response = await getHomepageMovies()
        if (response.success && response.data) {
          setRandomRecommendMovies(transformApiMovies(response.data.recommended))
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("載入隨機推薦失敗:", err)
      }
    }
    fetchRandomRecommend()
  }, [])

  useEffect(() => {
    if (!trimmedQuery) {
      setSearchResults([])
      setError(null)
      return undefined
    }

    const timeoutId = setTimeout(async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await searchMovies(trimmedQuery)

        if (response.success) {
          setSearchResults(transformApiMovies(response.data || []))
        } else {
          setError(response.message || "搜尋失敗")
          setSearchResults([])
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "發生未知錯誤")
        setSearchResults([])
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [trimmedQuery])

  const showNoResult = trimmedQuery.length > 0 && !loading && searchResults.length === 0
  const showRandomRecommend = !trimmedQuery || showNoResult

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#121212]">
      <div className="mt-3 flex w-full flex-col gap-3 px-4">
        <h1 className="font-family-inter text-xl leading-[1.2] font-semibold text-white">搜尋</h1>
        <div className="flex w-full gap-3 rounded-lg bg-[#555555] px-4 py-2">
          <Search className="h-6 w-6 text-[#BABABA]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜尋電影名稱"
            type="text"
            maxLength={MAX_QUERY_LENGTH}
            className="w-full bg-transparent text-white outline-none placeholder:text-[#BABABA]"
          />
        </div>
      </div>

      <div className={`w-full flex-1 px-4 ${!trimmedQuery ? "pt-6" : "pt-3"}`}>
        {loading && (
          <div className="flex items-center justify-center py-8">
            <p className="text-white">搜尋中...</p>
          </div>
        )}

        {error && !loading && (
          <div className="mb-6 flex flex-col gap-3">
            <p className="font-family-inter text-xl leading-[1.2] font-semibold text-red-500">
              搜尋錯誤
            </p>
            <span className="font-family-inter flex leading-normal break-all whitespace-normal text-[#9E9E9E]">
              {error}
            </span>
          </div>
        )}

        {!loading && !error && searchResults.length > 0 && (
          <div className="grid grid-cols-3 gap-3">
            {searchResults.map((movie) => (
              <div key={movie.id} className="flex flex-col gap-2">
                <img
                  src={movie.poster || ""}
                  alt={movie.titleZh}
                  className="h-37 w-full overflow-hidden rounded-lg object-cover"
                />
                <span className="font-family-inter line-clamp-2 h-11 text-center text-sm leading-normal font-normal break-all text-white">
                  {movie.titleZh}
                </span>
              </div>
            ))}
          </div>
        )}

        {showNoResult && !error && (
          <div className="mb-6 flex flex-col gap-3">
            <p className="font-family-inter text-xl leading-[1.2] font-semibold text-white">
              沒有結果
            </p>
            <span className="font-family-inter flex leading-normal break-all whitespace-normal text-[#9E9E9E]">
              Better Than 威秀中沒有「{trimmedQuery}」的結果。請嘗試其他搜尋。
            </span>
          </div>
        )}

        {/* 隨機推薦（沒有搜尋時或搜尋不到時顯示） */}
        {showRandomRecommend && (
          <div className="flex flex-col gap-3">
            <h2 className="font-family-inter text-lg font-semibold text-white">隨機推薦</h2>
            <div className="grid grid-cols-3 gap-3">
              {randomRecommendMovies.map((movie: Movie) => (
                <div key={movie.id} className="flex flex-col gap-2">
                  <img
                    src={movie.poster}
                    alt={movie.titleZh}
                    className="h-37 w-full overflow-hidden rounded-lg object-cover"
                  />
                  <span className="font-family-inter line-clamp-2 h-11 text-center text-sm leading-normal font-normal break-all text-white">
                    {movie.titleZh}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default MovieSearch
