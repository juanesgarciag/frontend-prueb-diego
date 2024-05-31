import { Navigate, Routes, Route } from "react-router-dom"
import { NewStudentPage, StudentsPage } from "../pages"

export const StudentRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<StudentsPage />}></Route>
        <Route path='new-student' element={<NewStudentPage />}></Route>
        <Route path='/*' element={<Navigate to='/'/>}></Route>
    </Routes>
  )
}
