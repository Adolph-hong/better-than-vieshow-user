import { Routes, Route } from "react-router-dom"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import Home from "./Home"
import Test from "./Test"

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/test" element={<Test />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
  </Routes>
)

export default AppRouter
