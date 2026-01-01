1. API路徑為：(GET) /api/movies/{id}/available-dates

2. API回傳值範例為：
{
  "success": true,
  "message": null,
  "data": {
    "movieId": 1,
    "title": "阿凡達：水之道",
    "rating": "G",
    "duration": 192,
    "genre": "SciFi,Action,Adventure",
    "posterUrl": null,
    "trailerUrl": null,
    "dates": [
      {
        "date": "2023-10-25",
        "dayOfWeek": "週三"
      }
    ]
  },
  "errors": null
}

3. 回應資料包含：

電影基本資訊（標題、分級、時長、類型）
媒體資訊（海報、預告片）
可訂票日期列表（含星期幾）

4. API流程說明:
此端點用於訂票流程的第一步：選擇日期。

返回該電影的完整資訊以及有場次且時刻表狀態為 OnSale（販售中）的日期列表。

無需授權，任何使用者皆可存取。

