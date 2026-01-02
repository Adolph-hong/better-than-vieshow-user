實作票券訂單列表點擊後跳轉到票券訂單詳細頁面

1. API詳細說明：

安全性：

需要 JWT Token 認證
使用者只能查詢自己的訂單
回應資料包含：

訂單基本資訊（訂單編號、狀態、過期時間）
電影資訊（片名、分級、片長、海報）
場次資訊（日期、時間、星期幾）
影廳資訊（影廳名稱、類型）
座位與票券列表
付款方式（如：Line Pay，未付款則為 null）
應付總額

2. API路徑為：(GET) /api/orders/{id} 
取得訂單詳情


3. 成功回應範例 (200 OK)：

{
  "success": true,
  "message": "成功取得訂單詳情",
  "data": {
    "orderId": 1,
    "orderNumber": "#BKA-13005",
    "status": "Paid",
    "expiresAt": "2025-12-30T10:35:00Z",
    "movie": {
      "title": "黑豹",
      "rating": "PG-13",
      "duration": 135,
      "posterUrl": "https://example.com/poster.jpg"
    },
    "showtime": {
      "date": "2025-12-15",
      "startTime": "16:30",
      "dayOfWeek": "三"
    },
    "theater": {
      "name": "鳳廳",
      "type": "Digital"
    },
    "seats": [
      {
        "seatId": 1,
        "rowName": "H",
        "columnNumber": 12,
        "ticketNumber": "12345678"
      }
    ],
    "paymentMethod": "Line Pay",
    "totalAmount": 1070
  }
}

4. 只實作串接API的步驟，原本的樣式請照原樣，不要更動。
