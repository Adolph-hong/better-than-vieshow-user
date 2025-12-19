import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import Footer from "@/components/home/Footer"
import { allMovies } from "@/components/home/movieData"

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
            // 只用 titleZh 當搜尋來源：
            // - 中文片名：直接用中文比對
            // - 英文片名：只要在 titleZh 寫英文，例如 "Apple"，一樣可以用 apple / APPLE 搜尋
            return movie.titleZh.toLowerCase().includes(keyword)
          }),
    [trimmedQuery]
  )

  const showNoResult = trimmedQuery.length > 0 && filteredMovies.length === 0

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#121212]">
      <div className="flex flex-col mt-3 gap-3 w-full px-3">
        <h1 className="font-family-inter font-semibold text-xl text-white leading-[1.2]">搜尋</h1>
        <div className="flex gap-3 w-full rounded-lg px-3 py-2 bg-[#555555]">
          <Search className="w-6 h-6 text-[#BABABA]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜尋電影名稱"
            type="text"
            maxLength={MAX_QUERY_LENGTH}
            className="w-full bg-transparent text-white placeholder:text-[#BABABA] outline-none"
          />
        </div>
      </div>

      <div className="flex-1 w-full px-3 pt-3">
        {filteredMovies.length > 0 && (
          <div className="grid grid-cols-3 gap-3">
            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                className="flex flex-col gap-2"
              >
                <img
                  src={movie.poster}
                  alt={movie.titleZh}
                  className="object-cover rounded-lg h-37 w-full overflow-hidden"
                />
                <span className="font-family-inter font-normal text-sm leading-normal text-white h-11 line-clamp-2 break-all text-center">
                  {movie.titleZh}
                </span>
              </div>
            ))}
          </div>
        )}

        {showNoResult && (
          <div className="flex h-[643px] items-center justify-center px-4">
            <div className="flex flex-col items-center justify-center h-full text-center gap-3">
              <p className="font-family-inter text-xl font-semibold text-white">
                沒有結果
              </p>
              <span className="font-family-inter text-[#9E9E9E] leading-normal flex whitespace-normal break-all">
                Better Than 威秀中沒有「{trimmedQuery}」的結果。請嘗試其他搜尋。
              </span>
            </div>
          </div>
        )}
      </div>
      <Footer bottomStyle="bottom-4" />
    </div>
  )
}

export default MovieSearch