import type { SeatDataApiResponse } from "@/types/seat"
import sendAPI from "@/utils/sendAPI"

/**
 * 取得特定場次的座位資訊
 * @param showTimeId 場次 ID
 * @returns Promise<SeatDataApiResponse>
 */
export const getSeatData = async (showTimeId: number): Promise<SeatDataApiResponse> => {
  const response = await sendAPI(`/api/showtimes/${showTimeId}/seats`, "GET")

  if (!response.ok) {
    throw new Error(`API 請求失敗: ${response.status} ${response.statusText}`)
  }

  const data: SeatDataApiResponse = await response.json()
  return data
}
