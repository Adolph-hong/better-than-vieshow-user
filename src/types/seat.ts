export interface ApiSeat {
  seatId: number
  rowName: string
  columnNumber: number
  seatType: string
  status: "available" | "reserved" | "sold"
  isValid: boolean
}

export interface SeatDataApiResponse {
  success: boolean
  message: string | null
  data: {
    showTimeId: number
    movieTitle: string
    showDate: string
    startTime: string
    endTime: string
    theaterName: string
    theaterType: string
    price: number
    rowCount: number
    columnCount: number
    seats: ApiSeat[][]
  }
  errors: any
}

export interface Seat {
  id: string
  row: string
  column: number
  status: "available" | "sold" | "reserved" | "selected"
  type: string
}

export interface SeatMapData {
  showTimeId: number
  movieTitle: string
  showDate: string
  startTime: string
  endTime: string
  theaterName: string
  theaterType: string
  price: number
  rowCount: number
  columnCount: number
  seats: Seat[]
}
