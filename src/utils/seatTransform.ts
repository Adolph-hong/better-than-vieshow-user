import type { ApiSeat, Seat, SeatDataApiResponse, SeatMapData } from "@/types/seat"

/**
 * 將 API 的座位資料轉換為 UI 使用的格式
 */
export const transformSeatData = (apiResponse: SeatDataApiResponse): SeatMapData | null => {
  if (!apiResponse.success || !apiResponse.data) {
    return null
  }

  const { data } = apiResponse

  // 平坦化 二維陣列 並 轉換格式
  const transformedSeats: Seat[] = data.seats.flat().map((apiSeat: ApiSeat) => ({
    id: apiSeat.seatId.toString(),
    row: apiSeat.rowName,
    column: apiSeat.columnNumber,
    status: apiSeat.status === "available" ? "available" : "sold",
    type: apiSeat.seatType,
  }))

  return {
    showTimeId: data.showTimeId,
    movieTitle: data.movieTitle,
    showDate: data.showDate,
    startTime: data.startTime,
    endTime: data.endTime,
    theaterName: data.theaterName,
    theaterType: data.theaterType,
    price: data.price,
    rowCount: data.rowCount,
    columnCount: data.columnCount,
    seats: transformedSeats,
  }
}
