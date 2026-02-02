export const GENRE_MAP: Record<string, string> = {
  Action: "動作",
  Romance: "愛情",
  Adventure: "冒險",
  Thriller: "懸疑",
  Horror: "恐怖",
  SciFi: "科幻",
  Animation: "動畫",
  Comedy: "喜劇",
}

export const RATING_MAP: Record<string, string> = {
  G: "普遍級",
  P: "保護級",
  PG: "輔導級",
  R: "限制級",
}

export const THEATER_TYPE_MAP: Record<string, string> = {
  Digital: "一般數位",
  IMAX: "IMAX",
  "4DX": "4DX",
}

export const translateGenre = (genre: string): string => {
  // Support if genre is already Chinese or not in map, return original
  return GENRE_MAP[genre] || genre
}

export const translateRating = (rating: string): string => {
  // Support if rating is already Chinese or not in map, return original
  return RATING_MAP[rating] || rating
}

export const translateTheaterType = (theaterType: string): string => {
  // Support if theater type is already Chinese or not in map, return original
  return THEATER_TYPE_MAP[theaterType] || theaterType
}
