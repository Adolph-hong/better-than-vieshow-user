import { useState, useMemo, useEffect, useRef } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import { ArrowLeft, Info, X, ChevronDown, ChevronUp } from "lucide-react"
import { PuffLoader, ClipLoader } from "react-spinners"
import RoundedPlay from "@/assets/icon/checkout-flow/rounded_play.svg?react"
import BookingActionBar from "@/components/showtime/BookingActionBar"
import DateOptionButton from "@/components/showtime/DateOptionButton"
import ShowtimeOptionButton from "@/components/showtime/ShowtimeOptionButton"
import TicketCounter from "@/components/showtime/TicketCounter"
import { getMovieDetails, getMovieAvailableDates, getMovieShowtimes } from "@/services/showtimeAPI"
import type { MovieShowtimeData, ShowtimeGroup, ShowtimeSession, DateOption } from "@/types/showtime"
import {
  transformMovieDetails,
  transformAvailableDates,
  transformShowtimes,
  mergeMovieShowtimeData,
  getYouTubeEmbedUrl,
} from "@/utils/showtimeTransform"
import { translateGenre, translateRating } from "@/utils/movieTranslator"

const MovieShowtime = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams<{ id: string }>()
  const [movieData, setMovieData] = useState<MovieShowtimeData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Extract return state from login if exists
  const returnState = (location.state as {
    selectedDateId?: string
    selectedSessionId?: string
    ticketCount?: number
  })
  
  const [selectedDateId, setSelectedDateId] = useState<string | null>(returnState?.selectedDateId || null)
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(returnState?.selectedSessionId || null)
  const [ticketCount, setTicketCount] = useState(returnState?.ticketCount || 1)
  const [showInfo, setShowInfo] = useState(false)
  const [showTrailer, setShowTrailer] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [showtimeGroups, setShowtimeGroups] = useState<ShowtimeGroup[]>([])
  const [loadingShowtimes, setLoadingShowtimes] = useState(false)

  // Refs for auto-scroll
  const showtimeRef = useRef<HTMLElement>(null)
  const ticketCounterRef = useRef<HTMLElement>(null)

  // Load movie details and available dates on mount
  useEffect(() => {
    const loadMovieData = async () => {
      if (!id) {
        setError("電影 ID 不存在")
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)

        const movieId = parseInt(id, 10)
        if (Number.isNaN(movieId)) {
          setError("無效的電影 ID")
          setLoading(false)
          return
        }

        // Fetch movie details and available dates in parallel
        const [detailsResponse, datesResponse] = await Promise.all([
          getMovieDetails(movieId),
          getMovieAvailableDates(movieId),
        ])

        const details = transformMovieDetails(detailsResponse)
        const dates = transformAvailableDates(datesResponse)

        if (!details) {
          setError("無法取得電影資料")
          setLoading(false)
          return
        }

        const mergedData = mergeMovieShowtimeData(details, dates)
        setMovieData(mergedData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "發生未知錯誤")
        // eslint-disable-next-line no-console
        console.error("取得電影資料失敗:", err)
      } finally {
        setLoading(false)
      }
    }

    loadMovieData()
  }, [id])

  // Load showtimes when a date is selected
  useEffect(() => {
    const loadShowtimes = async () => {
      if (!selectedDateId || !id) return

      try {
        setLoadingShowtimes(true)
        const movieId = parseInt(id, 10)
        const showtimesResponse = await getMovieShowtimes(movieId, selectedDateId)
        const transformedShowtimes = transformShowtimes(showtimesResponse)
        setShowtimeGroups(transformedShowtimes)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("取得場次資料失敗:", err)
        setShowtimeGroups([])
      } finally {
        setLoadingShowtimes(false)
      }
    }

    loadShowtimes()
  }, [selectedDateId, id])

  // Auto-scroll to showtime section when showtimes finish loading
  useEffect(() => {
    if (selectedDateId && !loadingShowtimes && showtimeGroups.length > 0) {
      // Delay to ensure DOM is fully rendered
      setTimeout(() => {
        showtimeRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 150)
    }
  }, [selectedDateId, loadingShowtimes, showtimeGroups])

  // Auto-scroll to ticket counter section when session is selected
  useEffect(() => {
    if (selectedSessionId) {
      // Delay to wait for DOM render
      setTimeout(() => {
        ticketCounterRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 100)
    }
  }, [selectedSessionId])

  // 取得選中的場次資訊
  const selectedSession = useMemo(() => {
    if (!selectedSessionId) return null
    const group = showtimeGroups.find((g) =>
      g.sessions.some((s) => s.id === selectedSessionId)
    )
    return group?.sessions.find((s) => s.id === selectedSessionId) || null
  }, [selectedSessionId, showtimeGroups])

  // 計算動態最大人數（不超過可用座位，且最多 6 人）
  const maxTickets = useMemo(() => {
    if (!selectedSession) return 6
    return Math.min(selectedSession.availableSeats, 6)
  }, [selectedSession])

  const selectedSessionPrice = useMemo(() => {
    if (!selectedSessionId) return 0
    const group = showtimeGroups.find((g) =>
      g.sessions.some((s) => s.id === selectedSessionId)
    )
    return group ? group.price : 0
  }, [selectedSessionId, showtimeGroups])

  const totalPrice = selectedSessionPrice * ticketCount

  // 當切換場次時，如果當前人數超過新場次的最大人數，自動調整
  useEffect(() => {
    if (selectedSessionId && ticketCount > maxTickets) {
      setTicketCount(maxTickets)
    }
  }, [selectedSessionId, maxTickets, ticketCount])

  const handleIncrement = () => {
    setTicketCount((prev) => Math.min(prev + 1, maxTickets))
  }

  const handleDecrement = () => {
    setTicketCount((prev) => Math.max(prev - 1, 1))
  }

  const handleBooking = () => {
    if (!selectedDateId || !selectedSessionId || !movieData) return

    // Check if user is logged in
    const token = localStorage.getItem("token")
    if (!token) {
      // User is not logged in, redirect to login page with return URL
      navigate("/login", {
        state: {
          returnUrl: `/movie/showtime/${id}`,
          returnState: {
            selectedDateId,
            selectedSessionId,
            ticketCount,
          },
        },
      })
      return
    }

    const selectedDate = movieData.dates.find((d: DateOption) => d.id === selectedDateId)

    let selectedGroup: ShowtimeGroup | undefined
    let selectedSession: ShowtimeSession | undefined

    const foundGroup = showtimeGroups.find((group) =>
      group.sessions.some((s) => s.id === selectedSessionId)
    )

    if (foundGroup) {
      selectedGroup = foundGroup
      selectedSession = foundGroup.sessions.find((s) => s.id === selectedSessionId)
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
          showTimeId: selectedSession.showTimeId,
        },
      })
    }
  }

  // Truncate description logic
  const truncateLength = 73
  const displayDescription = useMemo(() => {
    if (!movieData) return ""
    if (isExpanded) return movieData.description
    return movieData.description.length > truncateLength
      ? `${movieData.description.slice(0, truncateLength)}...`
      : movieData.description
  }, [movieData, isExpanded])

  const trailerEmbedUrl = useMemo(() => {
    if (!movieData?.trailerUrl) return ""
    // 加入更多參數減少不必要的後台請求:
    // cc_load_policy=0 (不載入字幕), iv_load_policy=3 (不顯示註解)
    const baseUrl = getYouTubeEmbedUrl(movieData.trailerUrl)
    if (!baseUrl) return ""
    const separator = baseUrl.includes("?") ? "&" : "?"
    return `${baseUrl}${separator}cc_load_policy=0&iv_load_policy=3`
  }, [movieData?.trailerUrl])

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-black text-white">
        <PuffLoader color="#11968D" size={80} />
        <p className="text-lg font-medium text-white">你超有品味 !</p>
      </div>
    )
  }

  if (error || !movieData) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
        <p className="text-red-500">錯誤: {error || "無法載入電影資料"}</p>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mt-4 rounded-lg bg-[#11968D] px-4 py-2 text-white"
        >
          返回首頁
        </button>
      </div>
    )
  }

  return (
    <div className="bg-black text-white">
      {/* Trailer Modal */}
      {showTrailer && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 transition-opacity duration-300">
          {/* Close button - repositioned to match Info button */}
          <button
            type="button"
            onClick={() => setShowTrailer(false)}
            className="absolute top-3 right-4 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-sm bg-[#AAAAAA] backdrop-blur-xs"
          >
            <X className="h-6 w-6 text-white" />
          </button>

          <div className="relative w-full">
            <div className="aspect-video w-full overflow-hidden bg-black shadow-2xl">
              <iframe
                width="100%"
                height="100%"
                src={trailerEmbedUrl}
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
        <div className="flex h-full flex-col px-4 pt-5">
          {/* Header */}
          <div className="mb-3 flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">{movieData.title}</h2>
              <div className="mt-1 text-sm text-[#BDBDBD]">
                {translateRating(movieData.rating)} · {movieData.duration}
              </div>
              <div className="mt-3 flex gap-2">
                {movieData.genres.map((genre: string) => (
                  <span
                    key={genre}
                    className="rounded-full bg-[#333333] px-3 py-1 text-xs text-[#FFFFFF]"
                  >
                    {translateGenre(genre)}
                  </span>
                ))}
              </div>
            </div>
            <button type="button" onClick={() => setShowInfo(false)} className="cursor-pointer">
              <X />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="mb-3 text-sm leading-relaxed text-[#BDBDBD]">
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
                  className="inline-flex cursor-pointer items-center text-sm text-[#BDBDBD] underline decoration-[#CCCCCC] underline-offset-2"
                >
                  收起
                  <ChevronUp className="ml-0.5 h-4 w-4" />
                </button>
              )}
            </div>

            <div className="space-y-2 border-t border-[#E5E5E5] pt-3 text-[#BDBDBD]">
              <div className="flex text-sm">
                <span className="w-18">導演</span>
                <span>{movieData.director}</span>
              </div>
              <div className="flex text-sm">
                <span className="w-18 shrink-0">演員</span>
                <span>{movieData.cast}</span>
              </div>
              <div className="flex text-sm">
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
            onClick={() => navigate("/")}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-white/20 backdrop-blur-xs"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={() => setShowInfo(true)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-white/20 backdrop-blur-xs"
          >
            <Info className="h-6 w-6 text-white" />
          </button>
        </div>

        {/* 前景清晰海報層 */}
        <div className="relative z-10 h-[300px] overflow-hidden px-4">
          <img
            src={movieData.posterUrl}
            alt={movieData.title}
            className="h-full w-full rounded-lg object-cover object-top"
          />

          {/* 播放預告片按鈕 - 移至海報上 */}
          <div className="absolute right-7 bottom-3">
            <button
              type="button"
              onClick={() => setShowTrailer(true)}
              className="flex cursor-pointer items-center gap-1 rounded-lg bg-[#11968D] px-2 py-[6px] text-sm"
            >
              <RoundedPlay className="h-5 w-5" />
              <span className="text-sm leading-[1.2]">播放預告片</span>
            </button>
          </div>
        </div>

        {/* 電影資訊 */}
        <div className="absolute z-10 mt-3 w-full">
          <div>
            <h1 className="mb-1 text-center text-2xl font-semibold">{movieData.title}</h1>
            <p className="mb-2 text-center text-sm text-[#BDBDBD]">
              {translateRating(movieData.rating)} · {movieData.duration}
            </p>
            <div className="flex justify-center gap-2">
              {movieData.genres.map((genre) => (
                <span
                  key={genre}
                  className="rounded-full border border-[#F5F5F5] px-4 py-[6px] text-xs text-[#F5F5F5]"
                >
                  {translateGenre(genre)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 pt-4">
        <section className="mb-6" aria-labelledby="date-selection">
          <h2 id="date-selection" className="mb-2 text-xl font-semibold">
            選擇日期
          </h2>
          <div className="flex flex-wrap gap-3">
            {movieData.dates.map((dateData: DateOption) => (
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
            <h2 id="showtime-selection" className="mb-2 text-xl font-semibold">
              選擇時段
            </h2>
            {loadingShowtimes && (
              <div className="flex items-center justify-center py-8">
                <ClipLoader color="#11968D" size={30} />
              </div>
            )}
            {!loadingShowtimes && showtimeGroups.length === 0 && (
              <p className="py-4 text-center text-[#BDBDBD]">此日期暫無場次</p>
            )}
            {!loadingShowtimes && showtimeGroups.length > 0 && (
              <div className="space-y-2">
                {showtimeGroups.map((group) => (
                  <article key={group.id}>
                    <div className="mb-[5px] flex items-center justify-between">
                      <h3 className="text-lg">{group.name}</h3>
                      <span className="text-lg">${group.price}/人</span>
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
            )}
          </section>
        )}

        {selectedSessionId && (
          <section ref={ticketCounterRef} className="mb-3" aria-label="Ticket count selection">
            <TicketCounter
              count={ticketCount}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              maxCount={maxTickets}
              minCount={1}
              availableSeats={selectedSession?.availableSeats}
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
