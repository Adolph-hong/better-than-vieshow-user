import { useState } from "react"
import { Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import Header from "@/components/home/Header"
import type { Movie } from "@/components/home/movieListData"
import { translateGenre, translateRating } from "@/utils/movieTranslator"
import type { Swiper as SwiperType } from "swiper"
// @ts-expect-error - Swiper CSS files don't have type declarations
import "swiper/css"
// @ts-expect-error - Swiper CSS files don't have type declarations
import "swiper/css/navigation"
// @ts-expect-error - Swiper CSS files don't have type declarations
import "swiper/css/pagination"

interface HeroBannerProps {
  movies: Movie[]
}

const HeroBanner = ({ movies }: HeroBannerProps) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleSlideChange = (swiperInstance: SwiperType) => {
    setActiveIndex(swiperInstance.realIndex)
  }

  if (!movies || movies.length === 0) {
    return null
  }

  const currentMovie = movies[activeIndex] || movies[0]

  if (!currentMovie) {
    return null
  }

  return (
    <section className="relative mb-3 flex h-[517px] w-full flex-col overflow-hidden mask-[linear-gradient(to_bottom,black_80%,black_80%_92%,transparent_100%)]">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-500"
        style={{
          backgroundImage: `url(${currentMovie.poster || ""})`,
        }}
      >
        <div className="absolute inset-0 backdrop-blur-[10px]" />
      </div>

      <div className="absolute inset-0 bg-black/75" />

      <Header />

      <div className="relative z-10 flex flex-1 items-start justify-center">
        <div className="w-full max-w-6xl">
          <Swiper
            onSlideChange={handleSlideChange}
            grabCursor
            centeredSlides
            slidesPerView="auto"
            loop={false}
            resistance
            resistanceRatio={0.5}
            watchSlidesProgress
            modules={[Navigation, Pagination]}
            className="h-[420px] pr-3 first:pl-0 last:pr-0"
          >
            {movies.length > 0 &&
              movies.map((movie: Movie, index: number) => {
                const diff = index - activeIndex
                const absDiff = Math.abs(diff)
                const isActive = diff === 0

                const getTransform = () => {
                  if (diff === 0) {
                    return "translateY(30px) translateX(0)"
                  }
                  if (diff === -1) {
                    return "translateY(0px) translateX(-30px)"
                  }
                  if (diff === 1) {
                    return "translateY(60px) translateX(30px)"
                  }
                  if (absDiff > 1) {
                    if (diff < 0) {
                      return `translateY(-30px) scale(${Math.max(0.5, 0.8 - absDiff * 0.1)}) translateX(${-50 - (absDiff - 1) * 20}px)`
                    }
                    return `translateY(${30 + (absDiff - 1) * 30}px) scale(${Math.max(0.5, 0.8 - absDiff * 0.1)}) translateX(${50 + (absDiff - 1) * 20}px)`
                  }
                  return "translateY(0) scale(0.8) translateX(0)"
                }

                const getOpacity = () => {
                  if (diff === 0) return 1
                  if (absDiff === 1) return 0.8
                  if (absDiff === 2) return 0.6
                  return 0.3
                }

                const getZIndex = () => {
                  if (diff === 0) return 10
                  if (absDiff === 1) return 5
                  return 1
                }

                return (
                  <SwiperSlide
                    key={movie.id}
                    className="h-[385px]! w-60! transition-all duration-500 ease-out"
                    style={{
                      transform: getTransform(),
                      opacity: getOpacity(),
                      zIndex: getZIndex(),
                    }}
                  >
                    <div className="relative h-full w-full overflow-hidden">
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="h-80 w-full rounded-lg object-cover"
                      />
                      {isActive && (
                        <div className="absolute right-0 bottom-0 left-0 px-4 text-center">
                          <h2 className="font-family-inter mb-1 line-clamp-1 overflow-hidden text-xl leading-[1.2] font-semibold break-all text-[#F5F5F5]">
                            {movie.titleZh}
                          </h2>
                          <p className="font-family-inter text-sm leading-normal font-normal text-[#9E9E9E]">
                            {translateGenre(movie.genre)}片・{translateRating(movie.rating)}・
                            {movie.duration}
                          </p>
                        </div>
                      )}
                    </div>
                  </SwiperSlide>
                )
              })}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default HeroBanner
