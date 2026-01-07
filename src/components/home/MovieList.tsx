import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import type { Movie } from "@/components/home/movieListData"

interface MovieListProps {
  movies: Movie[]
}

const MovieList = ({ movies }: MovieListProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!containerRef.current) {
      return undefined
    }

    let observers: IntersectionObserver[] = []
    let timer: ReturnType<typeof setTimeout> | null = null

    timer = setTimeout(() => {
      const container = containerRef.current
      if (!container) return

      const cards = Array.from(container.querySelectorAll<HTMLElement>(".movie-card-slide"))

      cards.forEach((card) => {
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
              if (entry.isIntersecting) {
                entry.target.classList.add("show")
              } else {
                entry.target.classList.remove("show")
              }
            })
          },
          {
            root: container,
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

  const handleMovieClick = (movieId: number) => {
    navigate(`/movie/showtime/${movieId}`)
  }

  return (
    <section className="flex w-full flex-col gap-2 overflow-x-hidden p-3">
      <h1 className="font-family-inter text-xl leading-[1.2] font-semibold text-white">所有電影</h1>
      <div ref={containerRef} className="grid grid-cols-3 gap-3 overflow-x-hidden pb-20">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="movie-card movie-card-slide show flex cursor-pointer flex-col gap-2"
            onClick={() => handleMovieClick(movie.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleMovieClick(movie.id)
            }}
          >
            <img
              src={movie.poster}
              alt={movie.titleZh}
              className="h-[145px] w-full overflow-hidden rounded-lg object-cover"
            />
            <span className="font-family-inter line-clamp-2 h-11 text-center text-sm leading-normal font-normal break-all text-white">
              {movie.titleZh}
            </span>
          </div>
        ))}
      </div>
      <style>{`
        .movie-card-slide {
          transition: transform 0.4s ease-out, opacity 0.4s ease-out;
        }
      `}</style>
    </section>
  )
}

export default MovieList
