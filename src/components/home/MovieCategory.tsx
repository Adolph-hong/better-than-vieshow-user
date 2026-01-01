import { useNavigate } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react"
// @ts-expect-error - Swiper CSS files don't have type declarations
import "swiper/css"
import type { Movie } from "@/components/home/movieListData"

interface MovieCategoryProps {
  category: string
  movies: Movie[]
}

const MovieCategory = ({ category, movies }: MovieCategoryProps) => {
  const navigate = useNavigate()
  const showRanking = category === "本週前10"
  const showCountdown = category === "即將上映"

  // 如果沒有電影資料，不顯示此區塊
  if (!movies || movies.length === 0) {
    return null
  }

  const handleMovieClick = (movieId: number) => {
    navigate(`/movie/showtime/${movieId}`)
  }

  return (
    <div className="flex flex-col gap-2 px-3">
      <h1 className="font-family-inter text-xl font-semibold text-white">{category}</h1>
      <Swiper slidesPerView="auto" grabCursor style={{ marginLeft: 0, marginRight: 12 }}>
        {movies.map((movie: Movie, index: number) => {
          const { id, titleZh, poster } = movie
          return (
            <SwiperSlide key={id} style={{ width: "auto" }} className="pr-3 first:pl-0 last:pr-0">
              <div
                className="flex cursor-pointer flex-col gap-2"
                onClick={() => handleMovieClick(id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleMovieClick(id)
                }}
              >
                <div className="relative h-[133px] w-25 rounded-xl">
                  {showRanking && (
                    <span className="font-family-inter absolute top-0 left-0 flex h-8 w-8 items-center justify-center bg-linear-to-b from-white to-white/40 bg-clip-text text-[28px] font-bold text-transparent">
                      {index + 1}
                    </span>
                  )}
                  {showCountdown && (
                    <span className="font-family-inter font-normla absolute top-1 left-1/2 flex h-[21px] w-18.5 -translate-x-1/2 items-center justify-center rounded-lg bg-black/60 px-2 py-[3px] text-xs text-white">
                      倒數 {index + 12} 天
                    </span>
                  )}
                  <img src={poster} alt={titleZh} className="h-35 w-full rounded-lg object-cover" />
                </div>
                <span className="font-family-inter line-clamp-2 h-11 w-25 text-center text-sm font-normal break-all text-white">
                  {titleZh}
                </span>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default MovieCategory
