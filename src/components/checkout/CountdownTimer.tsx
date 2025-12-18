import { useEffect, useState } from "react"

type CountdownTimerProps = {
  initialSeconds?: number
  onTimeout?: () => void
}

const CountdownTimer = ({ initialSeconds = 180, onTimeout }: CountdownTimerProps) => {
  const [seconds, setSeconds] = useState(initialSeconds)

  useEffect(() => {
    if (seconds > 0) {
      const timerId = setTimeout(() => {
        setSeconds((prev) => prev - 1)
      }, 1000)
      return () => clearTimeout(timerId)
    }

    if (seconds === 0 && onTimeout) {
      onTimeout()
    }
  }, [seconds, onTimeout])

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60)
    const remainingSeconds = totalSeconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="mb-4 rounded-[10px] bg-[#222222] p-3">
      <p className="text-sm text-[#9E9E9E]">請在時間內完成付款</p>
      <div className="mt-2 text-[32px] font-semibold">{formatTime(seconds)}</div>
    </div>
  )
}

export default CountdownTimer
