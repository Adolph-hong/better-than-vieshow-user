import MovieCategory from "@/components/home/MovieCategory"
import type { Movie } from "@/components/home/movieListData"

interface MovieSectionGroupProps {
  topWeekly: Movie[]
  upcoming: Movie[]
  randomRecommend: Movie[]
}

const MovieSectionGroup = ({ topWeekly, upcoming, randomRecommend }: MovieSectionGroupProps) => {
  const categories = [
    { title: "本週前10", movies: topWeekly },
    { title: "即將上映", movies: upcoming },
    { title: "隨機推薦", movies: randomRecommend },
  ]

  return (
    <section className="flex w-full flex-col gap-3 py-3">
      {categories.map((category) => (
        <MovieCategory key={category.title} category={category.title} movies={category.movies} />
      ))}
    </section>
  )
}

export default MovieSectionGroup
