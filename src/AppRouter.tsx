import { Routes, Route } from "react-router-dom"
import MovieShowtime from "../pages/MovieShowtime"
import Home from "./Home"

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/movie/showtime" element={<MovieShowtime />} />
  </Routes>
)

export default AppRouter
