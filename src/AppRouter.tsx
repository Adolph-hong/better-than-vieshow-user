import { Routes, Route } from "react-router-dom"
import Checkout from "../pages/Checkout"
import MovieShowtime from "../pages/MovieShowtime"
import PaymentSuccess from "../pages/PaymentSuccess"
import SeatSelection from "../pages/SeatSelection"
import Home from "./Home"

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/movie/showtime" element={<MovieShowtime />} />
    <Route path="/seat/selection" element={<SeatSelection />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/payment/success" element={<PaymentSuccess />} />
  </Routes>
)

export default AppRouter
