import { useState, useMemo, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Info, Play, Loader2 } from "lucide-react"
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

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const data = await fetchMovieShowtimes()
        setMovieData(data)
        // Modified: Removed automatic selection of first date to satisfy requirement 1
      } catch (error) {
        console.error("Failed to load movie data", error)
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

  if (loading || !movieData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
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
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-sm bg-white/20 backdrop-blur-[4px]"
          >
            <Info className="h-6 w-6 text-white" />
          </button>
        </div>

        {/* 前景清晰海報層 */}
        <div className="relative z-10 h-[300px] overflow-hidden px-4 shadow-lg">
          <img
            src={movieData.posterUrl}
            alt={movieData.title}
            className="h-full w-full rounded-xl object-cover object-top"
          />

          {/* 播放預告片按鈕 - 移至海報上 */}
          <div className="absolute right-5.5 bottom-1">
            <button
              type="button"
              className="active:bg-[#600000 flex shrink-0 cursor-pointer items-center gap-2 rounded-lg bg-[#11968D] px-2 py-[6px] text-sm font-normal"
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white">
                <Play className="h-3 w-3 fill-[#11968D]" />
              </div>
              播放預告片
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
                  className="rounded-3xl border border-[#F2F2F2] px-4 py-[5px] text-xs text-[#F2F2F2]"
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
          <section aria-labelledby="showtime-selection" className="pb-6">
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
          <section className="mb-3" aria-label="Ticket count selection">
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
