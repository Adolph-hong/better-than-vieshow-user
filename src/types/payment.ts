export interface LinePayRequest {
  orderId: number
}

export interface LinePayRequestResponse {
  success: boolean
  message: string
  data: {
    paymentUrl: string
  }
}

export interface LinePayConfirmRequest {
  transactionId: string
  orderId: number | string
}

export interface LinePayConfirmResponse {
  success: boolean
  message: string
  data: any
}
