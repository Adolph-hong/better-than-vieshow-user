import { useEffect, useRef } from "react"
import { allMovies } from "@/components/home/movieData"

const MovieList = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) {
      return undefined
    }

    let observers: IntersectionObserver[] = []
    let timer: ReturnType<typeof setTimeout> | null = null

    // 等待 DOM 渲染完成
    timer = setTimeout(() => {
      const container = containerRef.current
      if (!container) return

      const cards = Array.from(container.querySelectorAll<HTMLElement>(".movie-card-slide"))

      cards.forEach((card) => {
        // 立即檢查一次是否可見（用於初始狀態）
        const rect = card.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()
        const isVisible = 
          rect.top < containerRect.bottom && 
          rect.bottom > containerRect.top &&
          rect.left < containerRect.right &&
          rect.right > containerRect.left

        if (isVisible) {
          card.classList.add("show")
        }

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              // 進入視窗時滑入（從右邊來），離開時滑出（往右邊去）
              if (entry.isIntersecting) {
                entry.target.classList.add("show")
              } else {
                entry.target.classList.remove("show")
              }
            })
          },
          {
            root: container, // 使用容器作為視窗
            rootMargin: "0px",
            threshold: 0.01,
          }
        )

        observer.observe(card)
        observers.push(observer)
      })
    }, 50)

    return () => {
      if (timer) {
        clearTimeout(timer)
      }
      observers.forEach((observer) => {
        observer.disconnect()
      })
      observers = []
    }
  }, [])

  return (
    <section className="flex flex-col p-3 w-full gap-2 overflow-x-hidden">
      <h1 className="font-family-inter font-bold text-white">所有電影</h1>
      <div
        ref={containerRef}
        className="grid grid-cols-3 gap-3 overflow-y-auto overflow-x-hidden h-screen"
        style={{ scrollbarWidth: "thin" }}
      >
        {allMovies.map((movie) => (
          <div
            key={movie.id}
            className="movie-card movie-card-slide flex flex-col gap-2"
          >
            <img
              src={movie.poster}
              alt={movie.titleZh}
              className="object-cover rounded-xl h-[145px] w-full overflow-hidden"
            />
            <span className="font-family-inter font-normal text-sm text-white h-8.5 line-clamp-2 break-all text-center">
              {movie.titleZh}
            </span>
          </div>
        ))}
      </div>
      <style>{`
        .movie-card-slide {
          transform: translateX(80px) !important;
          opacity: 0 !important;
          transition: transform 0.4s ease-out, opacity 0.4s ease-out;
        }
        .movie-card-slide.show {
          transform: translateX(0) !important;
          opacity: 1 !important;
        }
      `}</style>
    </section>
  )
}

export default MovieList