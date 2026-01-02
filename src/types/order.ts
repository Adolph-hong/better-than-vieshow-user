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
