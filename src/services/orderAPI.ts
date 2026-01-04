import sendAPI from "@/utils/sendAPI"
import type { CreateOrderRequest, CreateOrderResponse, GetOrdersResponse, GetOrderResponse } from "@/types/order"

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

/**
 * 取得訂單列表
 * @returns Promise<GetOrdersResponse>
 */
export const getOrders = async (): Promise<GetOrdersResponse> => {
  const response = await sendAPI("/api/orders", "GET", undefined, true)

  if (!response.ok) {
    throw new Error(`取得訂單失敗: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

/**
 * 取得訂單詳情
 * @param orderId 訂單 ID
 * @returns Promise<GetOrderResponse>
 */
export const getOrder = async (orderId: string): Promise<GetOrderResponse> => {
  const response = await sendAPI(`/api/orders/${orderId}`, "GET", undefined, true)

  if (!response.ok) {
    throw new Error(`取得訂單詳情失敗: ${response.status} ${response.statusText}`)
  }

  return response.json()
}
