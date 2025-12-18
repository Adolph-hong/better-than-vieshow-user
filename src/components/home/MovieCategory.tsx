import { Swiper, SwiperSlide } from "swiper/react"
// @ts-expect-error - Swiper CSS files don't have type declarations
import "swiper/css"
import { movieCategories, type Movie } from "@/components/home/movieData"

const MovieCategory = ({ category }: { category: string }) => {
  const categoryData = movieCategories.find(cat => cat.title === category)
  const movies = categoryData?.movies || []
  const showRanking = category === "本週前10"
  const showCountdown = category === "即將上映"

  return (
    <div className="flex flex-col gap-2 px-3">
      <h1 className="font-family-inter font-semibold text-xl text-white">{category}</h1>
      <Swiper
        slidesPerView="auto"
        grabCursor
        style={{ marginLeft: 0, marginRight: 12 }}
      >
        {movies.map((movie: Movie, index: number) => {
          const { id, titleZh, poster } = movie
          return (
            <SwiperSlide key={id} style={{ width: 'auto' }} className="pr-3 first:pl-0 last:pr-0">
                  <div className="flex flex-col gap-2">
                    <div className="w-25 h-[133px] rounded-xl relative">
                      {showRanking && (
                        <span className="absolute top-0 left-0 w-8 h-8 font-family-inter font-bold flex items-center justify-center text-[28px] bg-linear-to-b from-white to-white/40 bg-clip-text text-transparent">
                          {index + 1}
                        </span>
                      )}
                      {showCountdown && (
                        <span className="absolute top-1 left-1/2 -translate-x-1/2 w-18.5 h-[21px] px-2 py-[3px] rounded-lg font-family-inter font-normla flex items-center justify-center text-xs text-white bg-black/60">
                        倒數 {index + 12} 天
                        </span>
                      )}
                      <img
                        src={poster}
                        alt={titleZh}
                        className="w-full h-35 object-cover rounded-lg"
                      />
                    </div>
                    <span className="font-family-inter font-normal text-sm text-white line-clamp-2 h-11 break-all w-25 text-center">
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