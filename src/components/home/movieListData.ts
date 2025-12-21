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

const baseMovies = {
  xuanyuan: {
    title: "Xuanyuan Sword",
    titleZh: "軒轅劍11111111111111111111111111111111111",
    genre: "奇幻片",
    rating: "普遍級",
    duration: "2小時",
    poster: xuanyuanPoster,
  },
  buliangren: {
    title: "Bu Liang Ren",
    titleZh: "不良人",
    genre: "武俠片",
    rating: "普遍級",
    duration: "2小時",
    poster: buliangrenPoster,
  },
  xianni: {
    title: "Xian Ni",
    titleZh: "仙逆",
    genre: "奇幻片",
    rating: "普遍級",
    duration: "2小時",
    poster: xianniPoster,
  },
  fanren: {
    title: "Fan Ren Xiu Xian",
    titleZh: "凡人修仙",
    genre: "奇幻片",
    rating: "普遍級",
    duration: "2小時",
    poster: fanrenPoster,
  },
  tianguan: {
    title: "Tian Guan Ci Fu",
    titleZh: "天官賜福",
    genre: "奇幻片",
    rating: "普遍級",
    duration: "2小時",
    poster: tianguanPoster,
  },
  wanmei: {
    title: "Perfect World",
    titleZh: "完美世界",
    genre: "奇幻片",
    rating: "普遍級",
    duration: "2小時",
    poster: wanmeiPoster,
  },
  yongsheng: {
    title: "Yong Sheng",
    titleZh: "永生",
    genre: "奇幻片",
    rating: "普遍級",
    duration: "2小時",
    poster: yongshengPoster,
  },
  mushen: {
    title: "Mu Shen Ji",
    titleZh: "牧神記",
    genre: "奇幻片",
    rating: "普遍級",
    duration: "2小時",
    poster: mushenPoster,
  },
  shendiao: {
    title: "The Legend of the Condor Heroes",
    titleZh: "神雕俠侶",
    genre: "武俠片",
    rating: "普遍級",
    duration: "2小時",
    poster: shendiaoPoster,
  },
  zhuxian: {
    title: "Zhu Xian",
    titleZh: "誅仙",
    genre: "奇幻片",
    rating: "普遍級",
    duration: "2小時",
    poster: zhuxianPoster,
  },
  yunshen: {
    title: "Yun Shen Bu Zhi Meng",
    titleZh: "雲深不知夢",
    genre: "奇幻片",
    rating: "普遍級",
    duration: "2小時",
    poster: yunshenPoster,
  },
  doupo: {
    title: "Battle Through the Heavens",
    titleZh: "鬥破蒼穹",
    genre: "奇幻片",
    rating: "普遍級",
    duration: "2小時",
    poster: doupoPoster,
  },
  modao: {
    title: "Mo Dao Zu Shi",
    titleZh: "魔道祖師",
    genre: "奇幻片",
    rating: "普遍級",
    duration: "2小時",
    poster: modaoPoster,
  },
} as const

type BaseKey = keyof typeof baseMovies

const buildList = (order: BaseKey[], startId: number): Movie[] =>
  order.map((key, idx) => ({
    id: startId + idx,
    ...baseMovies[key],
  }))

const moviesWeekTop10 = buildList(
  ["xuanyuan", "buliangren", "tianguan", "wanmei", "fanren", "yongsheng", "xianni", "mushen", "shendiao", "zhuxian"],
  1
)

const moviesComingSoon = buildList(
  ["doupo", "modao", "yunshen", "wanmei", "tianguan", "buliangren", "xianni", "fanren", "mushen", "yongsheng"],
  101
)

const moviesRandomRecommend = buildList(
  ["mushen", "zhuxian", "yongsheng", "fanren", "doupo", "xianni", "tianguan", "modao", "xuanyuan", "yunshen"],
  201
)

const allMoviesBase = buildList(
  ["xuanyuan", "buliangren", "xianni", "fanren", "tianguan", "wanmei", "yongsheng", "mushen", "shendiao", "zhuxian", "yunshen", "doupo", "modao"],
  301
)

export const allMovies: Movie[] = [
  ...allMoviesBase,
  ...allMoviesBase.map((movie, idx) => ({
    ...movie,
    id: 301 + allMoviesBase.length + idx,
    titleZh: `${movie.titleZh}2`,
  })),
  ...allMoviesBase.map((movie, idx) => ({
    ...movie,
    id: 301 + allMoviesBase.length * 2 + idx,
    titleZh: `${movie.titleZh}3`,
  })),
]

export interface MovieCategory {
  title: string
  movies: Movie[]
}

export const movieCategories: MovieCategory[] = [
  {
    title: "本週前10",
    movies: moviesWeekTop10,
  },
  {
    title: "即將上映",
    movies: moviesComingSoon,
  },
  {
    title: "隨機推薦",
    movies: moviesRandomRecommend,
  },
]

export const movies: Movie[] = moviesWeekTop10

