import { Routes, Route } from "react-router-dom"
import Checkout from "../pages/Checkout"
import Login from "../pages/Login"
import MovieShowtime from "../pages/MovieShowtime"
import PaymentSuccess from "../pages/PaymentSuccess"
import SeatSelection from "../pages/SeatSelection"
import Signup from "../pages/Signup"
import TicketDetail from "../pages/tickets/TicketDetail"
import TicketList from "../pages/tickets/TicketList"
import TicketsLayout from "../pages/tickets/TicketsLayout"
import TicketFeatureLayout from "./components/layout/TicketFeatureLayout"
import Home from "./Home"
import MovieSearch from "./MovieSearch"

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/movie/showtime" element={<MovieShowtime />} />
    <Route path="/seat/selection" element={<SeatSelection />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/movie-search" element={<MovieSearch />} />

    {/* Routes that require TicketContext */}
    <Route element={<TicketFeatureLayout />}>
      <Route path="/payment/success" element={<PaymentSuccess />} />
      <Route path="/tickets">
        <Route element={<TicketsLayout />}>
          <Route index element={<TicketList />} />
        </Route>
        <Route path=":id" element={<TicketDetail />} />
      </Route>
    </Route>
  </Routes>
)

export default AppRouter
