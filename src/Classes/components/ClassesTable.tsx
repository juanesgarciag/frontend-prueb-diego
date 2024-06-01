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
  Tooltip,
} from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import WarningIcon from "@mui/icons-material/Warning"
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye"
import axios, { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

import { theme } from "../../theme"
import { Classes } from "../../interfaces/classes.interface"

const fetchClasses = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/pruebaDiego/classes"
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

export const ClassesTable: React.FC = () => {
  const navigate = useNavigate()

  const [classes, setClasses] = useState<Classes[]>([])
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [classToDelete, setClassToDelete] = useState<Classes | null>()

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchClasses()
      setClasses(data)
    }

    fetchData()
  }, [])

  const handleEdit = (classes: Classes) => {
    navigate("/classes/new-class", { state: { classes } })
  }

  const handleDelete = (classes: Classes) => {
    setClassToDelete(classes)
    setShowDeleteDialog(true)
  }

  const handleConfirmDelete = async (classes: Classes | null | undefined) => {
    if (!classes) return
    try {
      const response = await axios.delete(
        `http://localhost:3000/pruebaDiego/classes/${classes?.id}`
      )
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: `La clase ${classes.nombreClase} fue eliminada correctamente`,
        timer: 2000,
        showConfirmButton: false,
      })
      setShowDeleteDialog(false)
      setClassToDelete(null)
      // Actualizar la lista de profesores
      setClasses((prevClasses) =>
        prevClasses.filter((t) => t.id !== classes.id)
      )
      return response.data
    } catch (error) {
      console.error("Error deleting class:", error)
      handleCancelDelete()
      const err = error as AxiosError
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `No se pudo eliminar la clase, ${err.response?.data.message}`,
        timer: 5000,
        showConfirmButton: false,
      })
      return []
    }
  }

  const handleCancelDelete = () => {
    setShowDeleteDialog(false)
    setClassToDelete(null)
  }
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label='classes table'>
          <TableHead>
            <TableRow sx={{ backgroundColor: "lightgray" }}>
              <TableCell>Nombre Clase</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Profesor</TableCell>
              <TableCell>Estudiantes</TableCell>
              <TableCell>Opciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classes.map((theClass, index) => (
              <TableRow key={index}>
                <TableCell>{theClass.nombreClase}</TableCell>
                <TableCell>{theClass.descripcionClase}</TableCell>
                <TableCell>
                  {theClass.profesor.nombre} {theClass.profesor.apellido}
                </TableCell>
                <TableCell>{theClass.estudiantes.length}</TableCell>
                <TableCell>
                  <Tooltip title='Ver estudiantes' placement='top'>
                    <IconButton
                      color='success'
                      // onClick={() => handleEdit(theClass)}
                    >
                      <RemoveRedEyeIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='Editar clase' placement='top'>
                    <IconButton
                      color='primary'
                      onClick={() => handleEdit(theClass)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='Eliminar clase' placement='top'>
                    <IconButton
                      color='error'
                      onClick={() => handleDelete(theClass)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
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
            ¿Estás seguro de que deseas eliminar la clase{" "}
            {classToDelete?.nombreClase}?
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
              onClick={() => handleConfirmDelete(classToDelete)}
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
