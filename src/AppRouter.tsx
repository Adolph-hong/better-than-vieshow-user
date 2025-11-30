import { Routes, Route } from "react-router-dom"
import MovieShowtime from "../pages/MovieShowtime"
import SeatSelection from "../pages/SeatSelection"
import Checkout from "../pages/Checkout"
import Home from "./Home"

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/movie/showtime" element={<MovieShowtime />} />
    <Route path="/seat/selection" element={<SeatSelection />} />
    <Route path="/checkout" element={<Checkout />} />
  </Routes>
)

export default AppRouter
