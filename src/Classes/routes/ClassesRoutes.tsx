import { Navigate, Routes, Route } from 'react-router-dom'
import { ClassesPage } from '../pages'
import { NewClassPage } from '../pages/NewClassPage'

export const ClassesRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<ClassesPage />}></Route>
        <Route path='new-class' element={<NewClassPage />}></Route>
        <Route path='/*' element={<Navigate to='/'/>}></Route>
    </Routes>
  )
}
