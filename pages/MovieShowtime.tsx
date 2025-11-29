import { useState, useMemo } from "react"
import { ArrowLeft, Info, Play } from "lucide-react"
import BookingActionBar from "@/components/showtime/BookingActionBar"
import DateOptionButton from "@/components/showtime/DateOptionButton"
import ShowtimeOptionButton from "@/components/showtime/ShowtimeOptionButton"
import TicketCounter from "@/components/showtime/TicketCounter"
import { movieShowtimesData } from "@/mocks/movieShowtimesData"

const MovieShowtime = () => {
  const [selectedDateId, setSelectedDateId] = useState<string | null>(
    movieShowtimesData.dates[0].id
  )
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null)
  const [ticketCount, setTicketCount] = useState(1)

  const currentShowtimeGroups = useMemo(() => {
    if (!selectedDateId) return []
    const selectedDate = movieShowtimesData.dates.find((d) => d.id === selectedDateId)
    return selectedDate ? selectedDate.showtimeGroups : []
  }, [selectedDateId])

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
    // 下一頁資料會從這邊帶過去到下一頁
  }

  return (
    <div className="min-h-screen bg-black pb-10 text-white">
      <header className="relative aspect-[4/5] w-full">
        <img
          src={movieShowtimesData.posterUrl}
          alt={movieShowtimesData.title}
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
            <h1 className="text-[28px] font-bold tracking-wide">{movieShowtimesData.title}</h1>
            <p className="text-sm text-[#CCCCCC]">
              {movieShowtimesData.rating} · {movieShowtimesData.duration}
            </p>
            <div className="flex gap-2">
              {movieShowtimesData.genres.map((genre) => (
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
            {movieShowtimesData.dates.map((dateData) => (
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
