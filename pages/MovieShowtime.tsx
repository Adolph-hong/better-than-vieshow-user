import { useState, useMemo, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Info, Loader2, X, ChevronDown, ChevronUp } from "lucide-react"
import RoundedPlay from "@/assets/icon/rounded_play.svg?react"
import BookingActionBar from "@/components/showtime/BookingActionBar"
import DateOptionButton from "@/components/showtime/DateOptionButton"
import ShowtimeOptionButton from "@/components/showtime/ShowtimeOptionButton"
import TicketCounter from "@/components/showtime/TicketCounter"
import {
  fetchMovieShowtimes,
  type MovieData,
  type ShowtimeGroup,
  type ShowtimeSession,
} from "@/mocks/movieData"

const MovieShowtime = () => {
  const navigate = useNavigate()
  const [movieData, setMovieData] = useState<MovieData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedDateId, setSelectedDateId] = useState<string | null>(null)
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null)
  const [ticketCount, setTicketCount] = useState(1)
  const [showInfo, setShowInfo] = useState(false)
  const [showTrailer, setShowTrailer] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  // Refs for auto-scroll
  const showtimeRef = useRef<HTMLElement>(null)
  const ticketCounterRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const data = await fetchMovieShowtimes()
        setMovieData(data)
        // Modified: Removed automatic selection of first date to satisfy requirement 1
      } catch {
        // console.error("Failed to load movie data", error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const currentShowtimeGroups = useMemo(() => {
    if (!selectedDateId || !movieData) return []
    const selectedDate = movieData.dates.find((d) => d.id === selectedDateId)
    return selectedDate ? selectedDate.showtimeGroups : []
  }, [selectedDateId, movieData])

  // Auto-scroll to showtime section when date is selected
  useEffect(() => {
    if (selectedDateId) {
      // Delay to wait for DOM render
      setTimeout(() => {
        showtimeRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 100)
    }
  }, [selectedDateId])

  // Auto-scroll to ticket counter section when session is selected
  useEffect(() => {
    if (selectedSessionId) {
      // Delay to wait for DOM render
      setTimeout(() => {
        ticketCounterRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 100)
    }
  }, [selectedSessionId])

  const selectedSessionPrice = useMemo(() => {
    if (!selectedSessionId) return 0
    const group = currentShowtimeGroups.find((g) =>
      g.sessions.some((s) => s.id === selectedSessionId)
    )
    return group ? group.price : 0
  }, [selectedSessionId, currentShowtimeGroups])

  const totalPrice = selectedSessionPrice * ticketCount

  const handleIncrement = () => {
    setTicketCount((prev) => Math.min(prev + 1, 6))
  }

  const handleDecrement = () => {
    setTicketCount((prev) => Math.max(prev - 1, 1))
  }

  const handleBooking = () => {
    if (!selectedDateId || !selectedSessionId || !movieData) return

    const selectedDate = movieData.dates.find((d) => d.id === selectedDateId)

    let selectedGroup: ShowtimeGroup | undefined
    let selectedSession: ShowtimeSession | undefined

    if (selectedDate) {
      const foundGroup = selectedDate.showtimeGroups.find((group) =>
        group.sessions.some((s) => s.id === selectedSessionId)
      )

      if (foundGroup) {
        selectedGroup = foundGroup
        selectedSession = foundGroup.sessions.find((s) => s.id === selectedSessionId)
      }
    }

    if (selectedDate && selectedGroup && selectedSession) {
      navigate("/seat/selection", {
        state: {
          movieTitle: movieData.title,
          date: `${selectedDate.date} (${selectedDate.dayOfWeek})`,
          time: selectedSession.time,
          price: selectedGroup.price,
          ticketCount,
          posterUrl: movieData.posterUrl,
          rating: movieData.rating,
          duration: movieData.duration,
          genre: movieData.genres[0],
          ticketType: selectedGroup.name,
        },
      })
    }
  }

  // Truncate description logic
  const truncateLength = 72
  const displayDescription = useMemo(() => {
    if (!movieData) return ""
    if (isExpanded) return movieData.description
    return movieData.description.length > truncateLength
      ? `${movieData.description.slice(0, truncateLength)}...`
      : movieData.description
  }, [movieData, isExpanded])

  if (loading || !movieData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Trailer Modal */}
      {showTrailer && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 transition-opacity duration-300">
          {/* Close button - repositioned to match Info button */}
          <button
            type="button"
            onClick={() => setShowTrailer(false)}
            className="absolute top-3 right-4 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-sm bg-[#AAAAAA] backdrop-blur-[4px]"
          >
            <X className="h-6 w-6 text-white" />
          </button>

          <div className="relative w-full">
            <div className="aspect-video w-full overflow-hidden bg-black shadow-2xl">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/n9OPh03GnI4?si=q1W4U5QJA6synPex&amp;start=3&autoplay=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
          {/* Close modal when clicking outside */}
          <div
            className="absolute inset-0 -z-10"
            onClick={() => setShowTrailer(false)}
            role="button"
            tabIndex={0}
            aria-label="Close trailer"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setShowTrailer(false)
            }}
          />
        </div>
      )}

      {/* Info Panel Overlay */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Close info panel"
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          showInfo ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setShowInfo(false)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setShowInfo(false)
        }}
      />

      {/* Slide-up Info Panel */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 h-[436px] transform rounded-t-3xl bg-[#232323] transition-transform duration-300 ease-out ${
          showInfo ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex h-full flex-col px-5 pt-[22px]">
          {/* Header */}
          <div className="mb-3 flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">{movieData.title}</h2>
              <div className="mt-3 text-sm text-[#CCCCCC]">
                {movieData.rating} · {movieData.duration}
              </div>
              <div className="mt-3 flex gap-2">
                {movieData.genres.map((genre) => (
                  <span
                    key={genre}
                    className="rounded-full bg-[#333333] px-3 py-1 text-xs text-[#FFFFFF]"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowInfo(false)}
              className="rounded-full bg-[#777777] text-[#CCCCCC]"
            >
              <X className="text-[#232323]" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="mb-3 text-sm leading-relaxed text-[#CCCCCC]">
              {displayDescription}
              {!isExpanded && movieData.description.length > truncateLength && (
                <button
                  type="button"
                  onClick={() => setIsExpanded(true)}
                  className="inline-flex cursor-pointer items-center text-sm text-[#CCCCCC] underline decoration-[#CCCCCC] underline-offset-2"
                >
                  閱讀更多
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              )}
              {isExpanded && (
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="inline-flex cursor-pointer items-center text-sm text-[#CCCCCC] underline decoration-[#CCCCCC] underline-offset-2"
                >
                  收起
                  <ChevronUp className="ml-0.5 h-4 w-4" />
                </button>
              )}
            </div>

            <div className="space-y-2 border-t border-[#E5E5E5] pt-3">
              <div className="flex text-sm text-[#E5E5E5]">
                <span className="w-18">導演</span>
                <span>{movieData.director}</span>
              </div>
              <div className="flex text-sm text-[#E5E5E5]">
                <span className="w-18 shrink-0">演員</span>
                <span>{movieData.cast}</span>
              </div>
              <div className="flex text-sm text-[#E5E5E5]">
                <span className="w-18">上映日</span>
                <span>{movieData.releaseDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <header className="relative h-[480px] w-full pt-[64px]">
        {/* 模糊背景層 */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="h-full w-full bg-cover bg-top bg-no-repeat blur-[10px]"
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), url(${movieData.posterUrl})`,
            }}
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* 上方導航按鈕 */}
        <div className="absolute top-0 right-0 left-0 z-20 flex items-center justify-between px-4 py-3">
          <button
            type="button"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-sm bg-white/20 backdrop-blur-[4px]"
          >
            <ArrowLeft className="h-6 w-6 text-white" />
          </button>
          <button
            type="button"
            onClick={() => setShowInfo(true)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-sm bg-white/20 backdrop-blur-[4px]"
          >
            <Info className="h-6 w-6 text-white" />
          </button>
        </div>

        {/* 前景清晰海報層 */}
        <div className="relative z-10 h-[300px] overflow-hidden px-4">
          <img
            src={movieData.posterUrl}
            alt={movieData.title}
            className="h-full w-full rounded-xl object-cover object-top"
          />

          {/* 播放預告片按鈕 - 移至海報上 */}
          <div className="absolute right-5.5 bottom-1">
            <button
              type="button"
              onClick={() => setShowTrailer(true)}
              className="flex cursor-pointer items-center gap-1 rounded-lg bg-[#11968D] px-2 py-1 text-sm"
            >
              <RoundedPlay />
              <span className="text-xs leading-[1.2]">播放預告片</span>
            </button>
          </div>
        </div>

        {/* 電影資訊 */}
        <div className="absolute z-10 w-full p-3">
          <div>
            <h1 className="mb-1 text-center text-[28px] font-bold tracking-wide">
              {movieData.title}
            </h1>
            <p className="mb-2 text-center text-sm text-[#D5D5D5]">
              {movieData.rating} · {movieData.duration}
            </p>
            <div className="flex justify-center gap-2">
              {movieData.genres.map((genre) => (
                <span
                  key={genre}
                  className="rounded-full border border-[#F2F2F2] px-4 py-[5px] text-xs text-[#F2F2F2]"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 pt-4">
        <section className="mb-6" aria-labelledby="date-selection">
          <h2 id="date-selection" className="mb-[5px] text-[17px] font-normal">
            日期
          </h2>
          <div className="flex flex-wrap gap-3">
            {movieData.dates.map((dateData) => (
              <DateOptionButton
                key={dateData.id}
                date={dateData.date}
                dayOfWeek={dateData.dayOfWeek}
                isSelected={selectedDateId === dateData.id}
                onClick={() => {
                  setSelectedDateId(dateData.id)
                  setSelectedSessionId(null) // Reset session when date changes
                }}
              />
            ))}
          </div>
        </section>

        {selectedDateId && (
          <section ref={showtimeRef} aria-labelledby="showtime-selection" className="pb-6">
            <h2 id="showtime-selection" className="mb-2 text-[17px]">
              選擇時段
            </h2>
            <div className="space-y-2">
              {currentShowtimeGroups.map((group) => (
                <article key={group.id}>
                  <div className="mb-[5px] flex items-center justify-between">
                    <h3 className="text-sm text-[#E5E5E5]">{group.name}</h3>
                    <span className="text-sm text-gray-300">${group.price}/人</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {group.sessions.map((session) => (
                      <ShowtimeOptionButton
                        key={session.id}
                        time={session.time}
                        isSelected={selectedSessionId === session.id}
                        onClick={() => setSelectedSessionId(session.id)}
                      />
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {selectedSessionId && (
          <section ref={ticketCounterRef} className="mb-3" aria-label="Ticket count selection">
            <TicketCounter
              count={ticketCount}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              maxCount={6}
              minCount={1}
            />
          </section>
        )}
      </main>

      {selectedSessionId && (
        <BookingActionBar
          totalPrice={totalPrice}
          onBooking={handleBooking}
          isDisabled={!selectedSessionId}
        />
      )}
    </div>
  )
}

export default MovieShowtime
