import { Routes, Route } from "react-router-dom"
import { TeacherRoutes } from "../Teachers/routes/TeacherRoutes"
import { StudentRoutes } from "../Students/routes/StudentRoutes"
import { HomeRoutes } from "../Home/router/HomeRoutes"
import { ClassesRoutes } from "../Classes/routes/ClassesRoutes"

export const AppRouter = () => {
  return (
    <Routes>
        <Route path="/home/*" element={<HomeRoutes />}/>
        <Route path="/teachers/*" element={<TeacherRoutes />}/>
        <Route path="/students/*" element={<StudentRoutes />}/>
        <Route path="/classes/*" element={<ClassesRoutes />}/>
    </Routes>
  )
}
