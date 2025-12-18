import { useState } from "react"
import { Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import Header from "@/components/home/Header"
import { movies, type Movie } from "@/components/home/movieData"
import type { Swiper as SwiperType } from "swiper"
// @ts-expect-error - Swiper CSS files don't have type declarations
import "swiper/css"
// @ts-expect-error - Swiper CSS files don't have type declarations
import "swiper/css/navigation"
// @ts-expect-error - Swiper CSS files don't have type declarations
import "swiper/css/pagination"

const HeroBanner = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleSlideChange = (swiperInstance: SwiperType) => {
    setActiveIndex(swiperInstance.realIndex)
  }

  const currentMovie = movies[activeIndex]

  return (
    <section className="
    relative flex flex-col w-full h-[517px] mb-3 overflow-hidden
    mask-[linear-gradient(to_bottom,black_80%,black_80%_92%,transparent_100%)]
  ">
      {/* 背景圖片 */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-500"
        style={{
          backgroundImage: `url(${currentMovie.poster})`,
        }}
      >
        {/* 模糊效果 */}
        <div className="absolute inset-0 backdrop-blur-[10px]" />
      </div>

      {/* 75% 黑色遮罩 */}
      <div className="absolute inset-0 bg-black/75" />

      <Header />

      {/* 輪播 */}
      <div className="relative z-10 flex-1 flex items-start justify-center">
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
            className="pr-3 first:pl-0 last:pr-0 h-[420px]"
          >
            {movies.map((movie: Movie, index: number) => {
              const diff = index - activeIndex
              const absDiff = Math.abs(diff)
              const isActive = diff === 0

              // 左邊頂在最上，中間距離上面30px，右邊距離上面60px
              const getTransform = () => {
                if (diff === 0) {
                  // 當前活動的卡片（中間）- 距離上面30px（已經通過容器pt-[30px]設置）
                  return "translateY(30px) translateX(0)"
                }
                if (diff === -1) {
                  // 左邊的卡片（前一個）- 頂在最上（需要向上移動30px來對齊頂部）
                  return "translateY(0px) translateX(-30px)"
                }
                if (diff === 1) {
                  // 右邊的卡片（下一個）- 距離上面60px（需要向下移動30px）
                  return "translateY(60px) translateX(30px)"
                }
                if (absDiff > 1) {
                  if (diff < 0) {
                    // 更左邊
                    return `translateY(-30px) scale(${Math.max(0.5, 0.8 - absDiff * 0.1)}) translateX(${-50 - (absDiff - 1) * 20}px)`
                  }
                  // 更右邊
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
                  className="w-60! h-[385px]! transition-all duration-500 ease-out"
                  style={{
                    transform: getTransform(),
                    opacity: getOpacity(),
                    zIndex: getZIndex(),
                  }}
                >
                  <div className="relative w-full h-full rounded-xl overflow-hidden">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-80 object-cover"
                    />
                    {/* 電影資訊只顯示在正中間卡片 */}
                    {isActive && (
                      <div className="text-center absolute bottom-0 left-0 right-0 px-4">
                        <h2 className="text-xl text-[#F5F5F5] font-family-inter font-semibold mb-1 line-clamp-1 break-all leading-[1.2] overflow-hidden">
                          {movie.titleZh}
                        </h2>
                        <p className="text-sm text-[#9E9E9E] font-family-inter font-normal leading-normal">
                          {movie.genre}・{movie.rating}・{movie.duration}
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