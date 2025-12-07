import { useState } from "react"
import { Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import Header from "@/components/home/Header"
import { movies } from "@/components/home/movieData"
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
    <div className="relative flex flex-col w-full h-125 mb-3 overflow-hidden">
      {/* 背景圖片 */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-500"
        style={{
          backgroundImage: `url(${currentMovie.poster})`,
        }}
      >
        {/* 模糊效果 */}
        <div className="absolute inset-0 backdrop-blur-md" />
      </div>

      {/* 75% 黑色遮罩 */}
      <div className="absolute inset-0 bg-black/75" />

      {/* Header */}
      <Header />

      {/* 輪播內容 */}
      <div className="relative z-10 flex-1 flex items-start justify-center pt-[30px]">
        <div className="w-full max-w-6xl">
          <Swiper
            onSlideChange={handleSlideChange}
            grabCursor
            centeredSlides
            slidesPerView="auto"
            spaceBetween={24}
            loop={false}
            resistance
            resistanceRatio={0.5}
            watchSlidesProgress
            modules={[Navigation, Pagination]}
            className="movie-swiper"
            style={{
              width: "100%",
              height: "auto",
            }}
          >
            {movies.map((movie, index) => {
              const diff = index - activeIndex
              const absDiff = Math.abs(diff)
              
              // 左邊頂在最上，中間距離上面30px，右邊距離上面60px
              const getTransform = () => {
                if (diff === 0) {
                  // 當前活動的卡片（中間）- 距離上面30px（已經通過容器pt-[30px]設置）
                  return "translateY(0) scale(1) translateX(0)"
                }
                if (diff === -1) {
                  // 左邊的卡片（前一個）- 頂在最上（需要向上移動30px來對齊頂部）
                  return "translateY(-30px) scale(0.9) translateX(-30px)"
                }
                if (diff === 1) {
                  // 右邊的卡片（下一個）- 距離上面60px（需要向下移動30px）
                  return "translateY(30px) scale(0.9) translateX(30px)"
                }
                if (absDiff > 1) {
                  // 更遠的卡片 - 隱藏或淡出
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
                  className="w-60! h-80! transition-all duration-500 ease-out"
                  style={{
                    transform: getTransform(),
                    opacity: getOpacity(),
                    zIndex: getZIndex(),
                  }}
                >
                  <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>

          {/* 電影資訊 */}
          {/* <div className="text-center mt-8 text-white">
            <h2 className="text-2xl font-bold mb-2">{currentMovie.titleZh}</h2>
            <p className="text-sm opacity-90">
              {currentMovie.genre}・{currentMovie.rating}・{currentMovie.duration}
            </p>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default HeroBanner