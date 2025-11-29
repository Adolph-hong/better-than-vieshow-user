import spiderManPoster from "@/assets/icon/spider man 1.jpg"

export type ShowtimeSession = {
  id: string
  time: string
}

export type ShowtimeGroup = {
  id: string
  name: string
  price: number
  sessions: ShowtimeSession[]
}

export type MovieDate = {
  id: string
  date: string
  dayOfWeek: string
  isActive?: boolean // To simulate the selected state in the image
  showtimeGroups: ShowtimeGroup[]
}

export type MovieData = {
  id: string
  title: string
  rating: string
  duration: string
  genres: string[]
  posterUrl: string
  dates: MovieDate[]
}

export const movieShowtimesData: MovieData = {
  id: "spider-man-nwh",
  title: "蜘蛛人：無家日",
  rating: "普遍級",
  duration: "2 小時 15 分鐘",
  genres: ["科幻", "動作"],
  posterUrl: spiderManPoster,
  dates: [
    {
      id: "d1",
      date: "12/05",
      dayOfWeek: "三",
      isActive: true,
      showtimeGroups: [
        {
          id: "g1",
          name: "一般 2D",
          price: 300,
          sessions: [
            { id: "s1", time: "上午 10:15" },
            { id: "s2", time: "中午 12:30" },
            { id: "s3", time: "下午 2:45" },
            { id: "s4", time: "下午 4:00" },
            { id: "s5", time: "晚上 9:15" },
          ],
        },
        {
          id: "g2",
          name: "3DX",
          price: 380,
          sessions: [
            { id: "s6", time: "上午 9:45" },
            { id: "s7", time: "下午 2:15" },
          ],
        },
        {
          id: "g3",
          name: "IMAX",
          price: 450,
          sessions: [
            { id: "s8", time: "上午 11:00" },
            { id: "s9", time: "下午 3:30" },
            { id: "s10", time: "晚上 8:00" },
          ],
        },
      ],
    },
    {
      id: "d2",
      date: "12/06",
      dayOfWeek: "四",
      showtimeGroups: [
        {
          id: "g1-d2",
          name: "一般 2D",
          price: 300,
          sessions: [
            { id: "s1-d2", time: "上午 11:15" },
            { id: "s2-d2", time: "下午 1:45" },
            { id: "s3-d2", time: "晚上 7:30" },
          ],
        },
        {
          id: "g3-d2",
          name: "IMAX",
          price: 450,
          sessions: [
            { id: "s8-d2", time: "下午 2:00" },
            { id: "s9-d2", time: "晚上 6:45" },
          ],
        },
      ],
    },
    {
      id: "d3",
      date: "12/07",
      dayOfWeek: "五",
      showtimeGroups: [
        {
          id: "g1-d3",
          name: "一般 2D",
          price: 300,
          sessions: [
            { id: "s1-d3", time: "上午 10:00" },
            { id: "s2-d3", time: "下午 3:00" },
            { id: "s3-d3", time: "晚上 8:00" },
            { id: "s4-d3", time: "晚上 11:00" },
          ],
        },
        {
          id: "g2-d3",
          name: "3DX",
          price: 380,
          sessions: [
            { id: "s6-d3", time: "下午 1:30" },
            { id: "s7-d3", time: "晚上 6:00" },
          ],
        },
      ],
    },
    {
      id: "d4",
      date: "12/08",
      dayOfWeek: "六",
      showtimeGroups: [
        {
          id: "g1-d4",
          name: "一般 2D",
          price: 300,
          sessions: [
            { id: "s1-d4", time: "上午 09:30" },
            { id: "s2-d4", time: "中午 12:00" },
            { id: "s3-d4", time: "下午 2:30" },
            { id: "s4-d4", time: "晚上 7:00" },
          ],
        },
        {
          id: "g3-d4",
          name: "IMAX",
          price: 450,
          sessions: [
            { id: "s8-d4", time: "上午 10:45" },
            { id: "s9-d4", time: "下午 4:15" },
          ],
        },
      ],
    },
    {
      id: "d5",
      date: "12/09",
      dayOfWeek: "日",
      showtimeGroups: [
        {
          id: "g1-d5",
          name: "一般 2D",
          price: 300,
          sessions: [
            { id: "s1-d5", time: "上午 10:30" },
            { id: "s2-d5", time: "下午 1:30" },
            { id: "s3-d5", time: "下午 4:30" },
            { id: "s4-d5", time: "晚上 8:30" },
          ],
        },
        {
          id: "g2-d5",
          name: "3DX",
          price: 380,
          sessions: [
            { id: "s6-d5", time: "中午 12:00" },
            { id: "s7-d5", time: "下午 3:00" },
          ],
        },
        {
          id: "g3-d5",
          name: "IMAX",
          price: 450,
          sessions: [{ id: "s8-d5", time: "晚上 6:30" }],
        },
      ],
    },
  ],
}
