import sendAPI from "@/utils/sendAPI"
import type { CreateOrderRequest, CreateOrderResponse } from "@/types/order"

/**
 * 建立訂單
 * @param request 訂單請求資料 (showTimeId, seatIds)
 * @returns Promise<CreateOrderResponse>
 */
export const createOrder = async (request: CreateOrderRequest): Promise<CreateOrderResponse> => {
  const response = await sendAPI("/api/orders", "POST", request, true)

  if (!response.ok) {
    throw new Error(`建立訂單失敗: ${response.status} ${response.statusText}`)
  }

  const data: CreateOrderResponse = await response.json()
  return data
}
