export interface OrderSeat {
  seatId: number
  rowName: string
  columnNumber: number
  ticketNumber: string
}

export interface OrderData {
  orderId: number
  orderNumber: string
  totalPrice: number
  expiresAt: string
  ticketCount: number
  seats: OrderSeat[]
}

export interface CreateOrderResponse {
  success: boolean
  message: string
  data: OrderData
}

export interface CreateOrderRequest {
  showTimeId: number
  seatIds: number[]
}

export interface OrderListItem {
  orderId: number
  movieTitle: string
  posterUrl: string
  showTime: string // ISO string "2025-12-15T16:30:00"
  ticketCount: number
  durationMinutes: number
  status: string // "Paid", "Pending", "Cancelled"
  isUsed: boolean
}

export interface GetOrdersResponse {
  success: boolean
  message: string
  data: OrderListItem[]
}

export interface OrderDetailMovie {
  title: string
  rating: string
  duration: number
  posterUrl: string
}

export interface OrderDetailShowtime {
  date: string
  startTime: string
  dayOfWeek: string
}

export interface OrderDetailTheater {
  name: string
  type: string
}

export interface OrderDetailSeat {
  ticketId: number
  seatId: number
  rowName: string
  columnNumber: number
  ticketNumber: string
  qrCodeContent: string
  status: string // "Used" | "Unused" etc.
}

export interface OrderDetail {
  orderId: number
  orderNumber: string
  status: string
  expiresAt: string
  movie: OrderDetailMovie
  showtime: OrderDetailShowtime
  theater: OrderDetailTheater
  seats: OrderDetailSeat[]
  paymentMethod: string | null
  totalAmount: number
  isUsed: boolean
}

export interface GetOrderResponse {
  success: boolean
  message: string
  data: OrderDetail
}
