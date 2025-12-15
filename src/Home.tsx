import Layout from "@/components/home/Layout"
import MovieList from "@/components/home/MovieList"
import MovieSectionGroup from "@/components/home/MovieSectionGroup"

const Home = () => (
  <Layout>
    <MovieSectionGroup />
    <MovieList />
  </Layout>
)

export default Home
