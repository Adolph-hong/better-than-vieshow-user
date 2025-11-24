import { Routes, Route } from "react-router-dom"
import Home from "./Home"
import Test from "./Test"

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  )
}

export default AppRouter
