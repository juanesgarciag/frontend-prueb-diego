import { Navigate, Routes, Route } from "react-router"
import { HomePage } from "../pages/HomePage"

export const HomeRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/*' element={<Navigate to='/'/>}></Route>
    </Routes>
  )
}
