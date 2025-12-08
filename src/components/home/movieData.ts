/* eslint-disable import/order */
import buliangrenPoster from "@/assets/movie/不良人.jpg"
import doupoPoster from "@/assets/movie/鬥破蒼穹.jpeg"
import fanrenPoster from "@/assets/movie/凡人修仙.jpg"
import mushenPoster from "@/assets/movie/牧神記.jpg"
import modaoPoster from "@/assets/movie/魔道祖師.jpg"
import tianguanPoster from "@/assets/movie/天官賜福.jpg"
import shendiaoPoster from "@/assets/movie/神雕俠侶.jpg"
import xianniPoster from "@/assets/movie/仙逆.jpeg"
import wanmeiPoster from "@/assets/movie/完美世界.jpeg"
import xuanyuanPoster from "@/assets/movie/軒轅劍.jpg"
import yongshengPoster from "@/assets/movie/永生.jpeg"
import yunshenPoster from "@/assets/movie/雲深不知夢.jpg"
import zhuxianPoster from "@/assets/movie/誅仙.jpg"

export interface Movie {
  id: number
  title: string
  titleZh: string
  genre: string
  rating: string
  duration: string
  poster: string
}

export const movies: Movie[] = [
  {
    id: 1,
    title: "Xuanyuan Sword",
    titleZh: "軒轅劍",
    genre: "奇幻片",
    rating: "普遍級",
    duration: "2小時",
    poster: xuanyuanPoster,
  },
  {
    id: 2,
    title: "Bu Liang Ren",
    titleZh: "不良人",
    genre: "武俠片",
    rating: "普遍級",
    duration: "2小時",
    poster: buliangrenPoster,
  },
  {
    id: 3,
    title: "Xian Ni",
    titleZh: "仙逆",
    genre: "奇幻片",
    rating: "普遍級",
    duration: "2小時",
    poster: xianniPoster,
  },
  {
    id: 4,
    title: "Fan Ren Xiu Xian",
    titleZh: "凡人修仙",
    genre: "奇幻片",
    rating: "普遍級",
    duration: "2小時",
    poster: fanrenPoster,
  },
  {
    id: 5,
    title: "Tian Guan Ci Fu",
    titleZh: "天官賜福",
    genre: "奇幻片",
    rating: "普遍級",
    duration: "2小時",
    poster: tianguanPoster,
  },
  {
    id: 6,
    title: "Perfect World",
    titleZh: "完美世界",
    genre: "奇幻片",
    rating: "普遍級",
    duration: "2小時",
    poster: wanmeiPoster,
  },
  {
    id: 7,
    title: "Yong Sheng",
    titleZh: "永生",
    genre: "奇幻片",
    rating: "普遍級",
    duration: "2小時",
    poster: yongshengPoster,
  },
  {
    id: 8,
    title: "Mu Shen Ji",
    titleZh: "牧神記",
    genre: "奇幻片",
    rating: "普遍級",
    duration: "2小時",
    poster: mushenPoster,
  },
  {
    id: 9,
    title: "The Legend of the Condor Heroes",
    titleZh: "神雕俠侶",
    genre: "武俠片",
    rating: "普遍級",
    duration: "2小時",
    poster: shendiaoPoster,
  },
  {
    id: 10,
    title: "Zhu Xian",
    titleZh: "誅仙",
    genre: "奇幻片",
    rating: "普遍級",
    duration: "2小時",
    poster: zhuxianPoster,
  },
  {
    id: 11,
    title: "Yun Shen Bu Zhi Meng",
    titleZh: "雲深不知夢",
    genre: "奇幻片",
    rating: "普遍級",
    duration: "2小時",
    poster: yunshenPoster,
  },
  {
    id: 12,
    title: "Battle Through the Heavens",
    titleZh: "鬥破蒼穹",
    genre: "奇幻片",
    rating: "普遍級",
    duration: "2小時",
    poster: doupoPoster,
  },
  {
    id: 13,
    title: "Mo Dao Zu Shi",
    titleZh: "魔道祖師",
    genre: "奇幻片",
    rating: "普遍級",
    duration: "2小時",
    poster: modaoPoster,
  },
]

