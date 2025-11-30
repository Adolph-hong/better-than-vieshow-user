const ROW_LABELS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"] as const
const COLUMN_COUNT = 9 // 每排9個座位

// 走道位置定義：每排的座位分佈（考慮垂直走道）
// 座位分佈：左3 | 走道 | 中左3 | 走道 | 中右3 | 走道 | 右3
// 但總共只有9個座位，所以調整為：左3 | 走道 | 中3 | 走道 | 右3
const AISLE_POSITIONS = [3, 6] // 在第3和第4之間、第6和第7之間有走道

type RowLabel = (typeof ROW_LABELS)[number]

export type SeatStatus = "available" | "sold" | "selected"
export type SeatType = "normal" | "wheelchair"

export type ShowtimeInfo = {
  movieTitle: string
  date: string
  time: string
}

export type Seat = {
  row: RowLabel
  column: number
  type: SeatType
  status: SeatStatus
}

export type SeatMap = {
  rows: number
  columns: number
  seats: Seat[]
  // 走道相關資訊
  verticalAisles: number[] // 垂直走道位置（在第幾列之後）
  horizontalAisle?: number // 橫向走道位置（在第幾排之後）
}

const wheelchairSeatIds = new Set(["A2", "G7"])
const selectedSeatIds = new Set(["A4", "A9", "B4"])
const soldSeatLayout: Partial<Record<RowLabel, number[]>> = {
  C: [4, 5, 6],
  D: [3, 4, 5, 6, 7],
  E: [2, 3, 4, 5, 6, 7, 8],
  F: [3, 4, 5, 6, 7],
  G: [4, 5, 6],
}

const soldSeatIds = new Set(
  ROW_LABELS.flatMap((row) => soldSeatLayout[row]?.map((column) => `${row}${column}`) ?? [])
)

const generateSeat = (row: RowLabel, column: number): Seat => {
  const seatId = `${row}${column}`
  const type: SeatType = wheelchairSeatIds.has(seatId) ? "wheelchair" : "normal"

  let status: SeatStatus = "available"
  if (soldSeatIds.has(seatId)) {
    status = "sold"
  }
  if (selectedSeatIds.has(seatId)) {
    status = "selected"
  }

  return {
    row,
    column,
    type,
    status,
  }
}

export const mockSeatMap: SeatMap = {
  rows: ROW_LABELS.length,
  columns: COLUMN_COUNT,
  seats: ROW_LABELS.flatMap((row) =>
    Array.from({ length: COLUMN_COUNT }, (_, index) => generateSeat(row, index + 1))
  ),
  verticalAisles: AISLE_POSITIONS, // 垂直走道位置
  horizontalAisle: 5, // 橫向走道在第5排（E）之後
}

export const mockShowtimeInfo: ShowtimeInfo = {
  movieTitle: "蜘蛛人：無家日",
  date: "12/05（三）",
  time: "下午 12:30",
}

export const mockSeatSelection = {
  showtime: mockShowtimeInfo,
  seatMap: mockSeatMap,
}
