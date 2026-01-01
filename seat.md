1. API路徑為：(GET) /api/showtimes/{id}/seats

2. API回傳值範例為：
{
  "success": true,
  "message": null,
  "data": {
    "showTimeId": 100,
    "movieTitle": "阿凡達",
    "showDate": "2023-10-25",
    "startTime": "10:00",
    "endTime": "13:12",
    "theaterName": "IMAX廳",
    "theaterType": "IMAX",
    "price": 380,
    "rowCount": 1,
    "columnCount": 1,
    "seats": [
      [
        {
          "seatId": 101,
          "rowName": "A",
          "columnNumber": 1,
          "seatType": "Standard",
          "status": "available",
          "isValid": true
        }
      ]
    ]
  },
  "errors": null
}

3. 回應資料包含：

場次和電影資訊
影廳資訊和票價
座位二維陣列（完整配置）

4. API流程說明:
此端點用於訂票流程的第三步：選擇座位。

返回該場次的完整座位資訊，包含座位二維陣列和每個座位的狀態。

無需授權，任何使用者皆可存取。