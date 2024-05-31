import { Navigate, Routes, Route } from 'react-router-dom'
import { NewTeacherPage, TeachersPage } from '../pages'

export const TeacherRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<TeachersPage />}></Route>
        <Route path='new-teacher' element={<NewTeacherPage />}></Route>
        <Route path='/*' element={<Navigate to='/'/>}></Route>
    </Routes>
  )
}
