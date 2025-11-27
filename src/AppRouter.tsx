import { Routes, Route } from "react-router-dom"
import SeatSelection from "../pages/SeatSelection"
import Home from "./Home"
import Test from "./Test"

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/test" element={<Test />} />
    <Route path="/seat/selection" element={<SeatSelection />} />
  </Routes>
)

export default AppRouter
