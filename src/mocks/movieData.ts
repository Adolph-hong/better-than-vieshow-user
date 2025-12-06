import blackPantherPoster from "@/assets/icon/black-panther.jpg"

// --- Movie Showtime Data Types ---

export type ShowtimeSession = {
  id: string
  time: string
}

export type ShowtimeGroup = {
  id: string
  name: string
  price: number
  sessions: ShowtimeSession[]
}

export type MovieDate = {
  id: string
  date: string
  dayOfWeek: string
  isActive?: boolean // To simulate the selected state in the image
  showtimeGroups: ShowtimeGroup[]
}

export type MovieData = {
  id: string
  title: string
  rating: string
  duration: string
  genres: string[]
  posterUrl: string
  description: string
  director: string
  cast: string
  releaseDate: string
  theaterName: string // 影廳名字
  orderId: string
  dates: MovieDate[]
}

// 訂單編號生成
export const generateOrderId = (): string => {
  return `#BKA-${Math.floor(10000 + Math.random() * 90000)}`
}

// --- Seat Selection Data Types ---

export const ROW_LABELS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"] as const
export const COLUMN_COUNT = 9 // 每排9個座位

// 走道位置定義：每排的座位分佈（考慮垂直走道）
// 座位分佈：左3 | 走道 | 中3 | 走道 | 右3
export const AISLE_POSITIONS = [3, 6] // 在第3和第4之間、第6和第7之間有走道

export type RowLabel = (typeof ROW_LABELS)[number]

export type SeatStatus = "available" | "sold" | "selected"
export type SeatType = "normal" | "wheelchair"

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

// --- Data Values ---

const movieShowtimesData: MovieData = {
  id: "black-panther",
  title: "黑豹",
  rating: "普遍級",
  duration: "2 小時 15 分鐘",
  genres: ["科幻", "動作"],
  posterUrl: blackPantherPoster,
  description:
    "在經歷《復仇者聯盟》的事件後，東尼·史塔克患上了嚴重的PTSD，對「紐約」和「蟲洞」等詞語會產生恐慌反應。恐怖組織「曼達林」開始在全美各地發動大規模爆炸攻擊，激怒了東尼，他在衝動之下向曼達林宣戰，卻遭到嚴厲的報復。在戰鬥中，東尼的鋼鐵裝甲受損，被迫避難，並開始暗中調查曼達林的秘密。",
  director: "萊恩·庫格勒",
  cast: "查德威克·鮑斯曼、麥可·B·喬丹、戴娜·葛里拉、莉蒂西亞·萊特",
  releaseDate: "2025/06/22",
  theaterName: "鳳廳",
  orderId: "#BKA-13005",
  dates: [
    {
      id: "d1",
      date: "12/05",
      dayOfWeek: "三",
      isActive: true,
      showtimeGroups: [
        {
          id: "g1",
          name: "一般 2D",
          price: 300,
          sessions: [
            { id: "s1", time: "上午 10:15" },
            { id: "s2", time: "中午 12:30" },
            { id: "s3", time: "下午 2:45" },
            { id: "s4", time: "下午 4:00" },
            { id: "s5", time: "晚上 9:15" },
          ],
        },
        {
          id: "g2",
          name: "3DX",
          price: 380,
          sessions: [
            { id: "s6", time: "上午 9:45" },
            { id: "s7", time: "下午 2:15" },
          ],
        },
        {
          id: "g3",
          name: "IMAX",
          price: 450,
          sessions: [
            { id: "s8", time: "上午 11:00" },
            { id: "s9", time: "下午 3:30" },
            { id: "s10", time: "晚上 8:00" },
          ],
        },
      ],
    },
    {
      id: "d2",
      date: "12/06",
      dayOfWeek: "四",
      showtimeGroups: [
        {
          id: "g1-d2",
          name: "一般 2D",
          price: 300,
          sessions: [
            { id: "s1-d2", time: "上午 11:15" },
            { id: "s2-d2", time: "下午 1:45" },
            { id: "s3-d2", time: "晚上 7:30" },
          ],
        },
        {
          id: "g3-d2",
          name: "IMAX",
          price: 450,
          sessions: [
            { id: "s8-d2", time: "下午 2:00" },
            { id: "s9-d2", time: "晚上 6:45" },
          ],
        },
      ],
    },
    {
      id: "d3",
      date: "12/07",
      dayOfWeek: "五",
      showtimeGroups: [
        {
          id: "g1-d3",
          name: "一般 2D",
          price: 300,
          sessions: [
            { id: "s1-d3", time: "上午 10:00" },
            { id: "s2-d3", time: "下午 3:00" },
            { id: "s3-d3", time: "晚上 8:00" },
            { id: "s4-d3", time: "晚上 11:00" },
          ],
        },
        {
          id: "g2-d3",
          name: "3DX",
          price: 380,
          sessions: [
            { id: "s6-d3", time: "下午 1:30" },
            { id: "s7-d3", time: "晚上 6:00" },
          ],
        },
      ],
    },
    {
      id: "d4",
      date: "12/08",
      dayOfWeek: "六",
      showtimeGroups: [
        {
          id: "g1-d4",
          name: "一般 2D",
          price: 300,
          sessions: [
            { id: "s1-d4", time: "上午 09:30" },
            { id: "s2-d4", time: "中午 12:00" },
            { id: "s3-d4", time: "下午 2:30" },
            { id: "s4-d4", time: "晚上 7:00" },
          ],
        },
        {
          id: "g3-d4",
          name: "IMAX",
          price: 450,
          sessions: [
            { id: "s8-d4", time: "上午 10:45" },
            { id: "s9-d4", time: "下午 4:15" },
          ],
        },
      ],
    },
    {
      id: "d5",
      date: "12/09",
      dayOfWeek: "日",
      showtimeGroups: [
        {
          id: "g1-d5",
          name: "一般 2D",
          price: 300,
          sessions: [
            { id: "s1-d5", time: "上午 10:30" },
            { id: "s2-d5", time: "下午 1:30" },
            { id: "s3-d5", time: "下午 4:30" },
            { id: "s4-d5", time: "晚上 8:30" },
          ],
        },
        {
          id: "g2-d5",
          name: "3DX",
          price: 380,
          sessions: [
            { id: "s6-d5", time: "中午 12:00" },
            { id: "s7-d5", time: "下午 3:00" },
          ],
        },
        {
          id: "g3-d5",
          name: "IMAX",
          price: 450,
          sessions: [{ id: "s8-d5", time: "晚上 6:30" }],
        },
      ],
    },
  ],
}

// --- Seat Map Mock Generator ---

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

const mockSeatMap: SeatMap = {
  rows: ROW_LABELS.length,
  columns: COLUMN_COUNT,
  seats: ROW_LABELS.flatMap((row) =>
    Array.from({ length: COLUMN_COUNT }, (_, index) => generateSeat(row, index + 1))
  ),
  verticalAisles: AISLE_POSITIONS, // 垂直走道位置
  horizontalAisle: 5, // 橫向走道在第5排（E）之後
}

// --- API Simulation ---

export const MOCK_ORDER_ID = "#BKA-13005"

export const fetchMovieShowtimes = async (): Promise<MovieData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(movieShowtimesData)
    }, 500) // Simulate 500ms delay
  })
}

export const fetchSeatMap = async (): Promise<SeatMap> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockSeatMap)
    }, 500) // Simulate 500ms delay
  })
}
