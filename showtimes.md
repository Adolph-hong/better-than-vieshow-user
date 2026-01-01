1. API路徑為：(GET) /api/movies/{id}/showtimes 

2. API回傳值範例為：
{
  "success": true,
  "message": null,
  "data": {
    "movieId": 1,
    "movieTitle": "阿凡達：水之道",
    "date": "2023-10-25",
    "showtimes": [
      {
        "showTimeId": 100,
        "theaterName": "IMAX廳",
        "theaterType": "IMAX",
        "startTime": "14:00",
        "endTime": "17:12",
        "price": 380,
        "availableSeats": 150,
        "totalSeats": 200
      }
    ]
  },
  "errors": null
}

3. 回應資料包含：

電影基本資訊（ID、名稱）
查詢日期
場次列表（影廳、時間、票價、座位資訊）

4. API流程說明:
此端點用於訂票流程的第二步：選擇場次。

返回該電影在指定日期的所有場次資訊，包含影廳、時間、票價、可用座位數等。

無需授權，任何使用者皆可存取。

