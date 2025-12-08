import { Routes, Route } from "react-router-dom"
import Home from "./Home"
import MovieSearch from "./MovieSearch"
import Test from "./Test"

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/test" element={<Test />} />
    <Route path="/movie-search" element={<MovieSearch />} />
  </Routes>
)

export default AppRouter
