import MovieCategory from "@/components/home/MovieCategory"
import { movieCategories } from "@/components/home/movieData"

const MovieSectionGroup = () => {
  return (
    <section className="flex flex-col py-3 gap-2 w-full">
      {movieCategories.map((category) => (
        <MovieCategory key={category.title} category={category.title} />
      ))}
    </section>
  )
}

export default MovieSectionGroup