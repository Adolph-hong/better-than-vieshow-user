import MovieCategory from "@/components/home/MovieCategory"
import { movieCategories } from "@/components/home/movieListData"

const MovieSectionGroup = () => {
  return (
    <section className="flex w-full flex-col gap-3 py-3">
      {movieCategories.map((category) => (
        <MovieCategory key={category.title} category={category.title} />
      ))}
    </section>
  )
}

export default MovieSectionGroup
