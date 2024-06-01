import React, { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  DialogActions,
  Button,
} from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import WarningIcon from "@mui/icons-material/Warning"
import axios, { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'

import { theme } from "../../theme"
import { Student } from "../../interfaces/students.interface"

const fetchStudents = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/pruebaDiego/students"
    )
    return response.data
  } catch (error) {
    const err = error as AxiosError
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error al cargar los datos ${err.response?.data.message}`,
        timer: 5000,
        showConfirmButton: false,
      })
    return []
  }
}

export const StudentsTable: React.FC = () => {
  const navigate = useNavigate()

  const [students, setStudents] = useState<Student[]>([])
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [studentToDelete, setStudentToDelete] = useState<Student | null>()

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchStudents()
      setStudents(data)
    }

    fetchData()
  }, [])

  const handleEdit = (student: Student) => {
    navigate("/students/new-student", { state: { student } })
  }

  const handleDelete = (teacher: Student) => {
    setStudentToDelete(teacher)
    setShowDeleteDialog(true)
  }

  const handleConfirmDelete = async (student: Student | null | undefined) => {
    if (!student) return
    try {
      const response = await axios.delete(
        `http://localhost:3000/pruebaDiego/students/${student?.id}`
      )
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: `El estudiante ${student.nombre} ${student.apellido} fue eliminado correctamente`,
        timer: 2000,
        showConfirmButton: false,
      })
      setShowDeleteDialog(false)
      setStudentToDelete(null)
      // Actualizar la lista de profesores
      setStudents((prevStudents) =>
        prevStudents.filter((t) => t.id !== student.id)
      )
      return response.data
    } catch (error) {
      console.error("Error obteining students:", error)
      handleCancelDelete()
      const err = error as AxiosError
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `No se pudo eliminar el estudiante ${err.response?.data.message}`,
        timer: 5000,
        showConfirmButton: false,
      })
      return []
    }
  }

  const handleCancelDelete = () => {
    setShowDeleteDialog(false)
    setStudentToDelete(null)
  }
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label='students table'>
          <TableHead>
            <TableRow sx={{ backgroundColor: "lightgray" }}>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Opciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student, index) => (
              <TableRow key={index}>
                <TableCell>{student.nombre}</TableCell>
                <TableCell>{student.apellido}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>
                  <IconButton
                    color='primary'
                    onClick={() => handleEdit(student)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color='error'
                    onClick={() => handleDelete(student)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box>
        <Dialog open={showDeleteDialog} onClose={handleCancelDelete}>
          <DialogTitle
            textAlign='center'
            sx={{
              bgcolor: "#9b0000",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <WarningIcon />
            Confirmar eliminación
          </DialogTitle>
          <DialogContent sx={{ margin: 2, textSize: "22px" }}>
            ¿Estás seguro de que deseas eliminar al estudiante{" "}
            {studentToDelete?.nombre} {studentToDelete?.apellido}?
          </DialogContent>
          <DialogActions
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant='contained'
              onClick={handleCancelDelete}
              sx={{ bgcolor: theme.palette.primary.dark, color: "white" }}
            >
              Cancelar
            </Button>
            <Button
              variant='contained'
              onClick={() => handleConfirmDelete(studentToDelete)}
              color='error'
            >
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  )
}
