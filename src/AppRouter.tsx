import { Routes, Route } from "react-router-dom"
import Login from "../pages/auth/Login"
import Signup from "../pages/auth/Signup"
import Checkout from "../pages/Checkout"
import CheckoutConfirm from "../pages/CheckoutConfirm"
import Home from "../pages/Home"
import MovieSearch from "../pages/MovieSearch"
import MovieShowtime from "../pages/MovieShowtime"
import PaymentSuccess from "../pages/PaymentSuccess"
import SeatSelection from "../pages/SeatSelection"
import TicketDetail from "../pages/tickets/TicketDetail"
import TicketList from "../pages/tickets/TicketList"
import TicketsLayout from "../pages/tickets/TicketsLayout"
import TicketFeatureLayout from "./components/layout/TicketFeatureLayout"

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/movie-search" element={<MovieSearch />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/movie/showtime/:id" element={<MovieShowtime />} />
    <Route path="/seat/selection" element={<SeatSelection />} />
    <Route path="/checkout/confirm" element={<CheckoutConfirm />} />
    <Route path="/checkout" element={<Checkout />} />

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
