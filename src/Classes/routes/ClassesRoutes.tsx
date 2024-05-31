import { Navigate, Routes, Route } from 'react-router-dom'
import { ClassesPage } from '../pages'
import { NewTeacherPage } from '../../Teachers/pages'

export const ClassesRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<ClassesPage />}></Route>
        <Route path='new-class' element={<NewTeacherPage />}></Route>
        <Route path='/*' element={<Navigate to='/'/>}></Route>
    </Routes>
  )
}
