import { Routes, Route } from "react-router-dom"
import Checkout from "../pages/Checkout"
import MovieShowtime from "../pages/MovieShowtime"
import PaymentSuccess from "../pages/PaymentSuccess"
import SeatSelection from "../pages/SeatSelection"
import TicketDetail from "../pages/tickets/TicketDetail"
import TicketList from "../pages/tickets/TicketList"
import TicketsLayout from "../pages/tickets/TicketsLayout"
import Home from "./Home"

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/movie/showtime" element={<MovieShowtime />} />
    <Route path="/seat/selection" element={<SeatSelection />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/payment/success" element={<PaymentSuccess />} />
    <Route path="/tickets">
      <Route element={<TicketsLayout />}>
        <Route index element={<TicketList />} />
      </Route>
      <Route path=":id" element={<TicketDetail />} />
    </Route>
  </Routes>
)

export default AppRouter
