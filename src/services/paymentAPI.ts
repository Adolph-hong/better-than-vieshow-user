import sendAPI from "@/utils/sendAPI"
import type {
  LinePayRequest,
  LinePayRequestResponse,
  LinePayConfirmRequest,
  LinePayConfirmResponse,
} from "@/types/payment"

/**
 * 發起 LINE Pay 付款請求
 */
export const requestLinePay = async (request: LinePayRequest): Promise<LinePayRequestResponse> => {
  const response = await sendAPI("/api/payments/line-pay/request", "POST", request, true)

  if (!response.ok) {
    throw new Error(`發起付款失敗: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

/**
 * 確認 LINE Pay 付款完成
 */
export const confirmLinePay = async (request: LinePayConfirmRequest): Promise<LinePayConfirmResponse> => {
  const response = await sendAPI("/api/payments/line-pay/confirm", "POST", request, true)

  if (!response.ok) {
    throw new Error(`確認付款失敗: ${response.status} ${response.statusText}`)
  }

  return response.json()
}
