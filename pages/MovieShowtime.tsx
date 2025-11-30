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
        if (data.dates.length > 0) {
          setSelectedDateId(data.dates[0].id)
        }
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

    // 直接遍歷查找，避免依賴計算屬性
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
    <div className="min-h-screen bg-black pb-10 text-white">
      <header className="relative aspect-[4/5] w-full">
        <img
          src={movieData.posterUrl}
          alt={movieData.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

        <div className="absolute top-0 right-0 left-0 flex items-center justify-between p-3">
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

        <div className="absolute bottom-0 left-0 w-full translate-y-4 px-3">
          <div className="flex justify-end pb-2">
            <button
              type="button"
              className="flex shrink-0 items-center gap-2 rounded-lg bg-[#830508] px-3 py-[10px] text-sm font-normal shadow-md active:bg-[#600000]"
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white">
                <Play className="h-3 w-3 fill-[#830508]" />
              </div>
              觀看預告片
            </button>
          </div>

          <div className="space-y-2 rounded-3xl border border-black/10 p-5 ring-[5px] ring-[#454545] backdrop-blur-[4px]">
            <h1 className="text-[28px] font-bold tracking-wide">{movieData.title}</h1>
            <p className="text-sm text-[#CCCCCC]">
              {movieData.rating} · {movieData.duration}
            </p>
            <div className="flex gap-2">
              {movieData.genres.map((genre) => (
                <span
                  key={genre}
                  className="rounded-3xl border border-[#E5E5E5] px-4 py-[5px] text-xs text-[#E5E5E5]"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="px-[15px] pt-8">
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
                  setSelectedSessionId(null) // 重選日期時清空已選場次
                }}
              />
            ))}
          </div>
        </section>

        <section className="mb-6" aria-labelledby="showtime-selection">
          <h2 id="showtime-selection" className="mb-[5px] text-[17px]">
            場次
          </h2>
          <div className="space-y-[5px]">
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

        <section className="mb-8" aria-label="Ticket count selection">
          <TicketCounter
            count={ticketCount}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            maxCount={6}
            minCount={1}
          />
        </section>
      </main>

      <BookingActionBar
        totalPrice={totalPrice}
        onBooking={handleBooking}
        isDisabled={!selectedSessionId}
      />
    </div>
  )
}

export default MovieShowtime
