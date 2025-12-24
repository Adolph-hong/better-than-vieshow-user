import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import { allMovies, movieCategories, type Movie } from "@/components/home/movieListData"
import Footer from "@/components/shared/Footer"

const MAX_QUERY_LENGTH = 700

const MovieSearch = () => {
  const [query, setQuery] = useState("")

  const trimmedQuery = query.trim()

  const filteredMovies = useMemo(
    () =>
      !trimmedQuery
        ? []
        : allMovies.filter((movie) => {
            const keyword = trimmedQuery.toLowerCase()
            return movie.titleZh.toLowerCase().includes(keyword)
          }),
    [trimmedQuery]
  )

  const showNoResult = trimmedQuery.length > 0 && filteredMovies.length === 0
  const showRandomRecommend = !trimmedQuery || showNoResult

  const randomRecommendMovies = useMemo(() => {
    const randomCategory = movieCategories.find((cat) => cat.title === "隨機推薦")
    return randomCategory?.movies || []
  }, [])

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
        {/* 搜尋結果 */}
        {filteredMovies.length > 0 && (
          <div className="grid grid-cols-3 gap-3">
            {filteredMovies.map((movie) => (
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
        )}

        {/* 沒有結果的訊息 */}
        {showNoResult && (
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
