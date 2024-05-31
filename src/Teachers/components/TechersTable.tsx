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
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import WarningIcon from '@mui/icons-material/Warning';
import axios from 'axios'

import { theme } from '../../theme'
import { Teacher } from "../../interfaces/teachers.interface"

const fetchTeachers = async () => {
  try {
    const response = await axios.get('http://localhost:3000/pruebaDiego/teachers');
    console.log('la respuesta de los profes', response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching teachers:', error);
    return [];
  }
};

export const TeachersTable: React.FC = () => {

  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTeachers();
      setTeachers(data);
    };

    fetchData();
  }, []);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [teacherToDelete, setTeacherToDelete] = useState<Teacher | null>();
  const handleEdit = (teacher: Teacher) => {
    console.log(`Edit teacher at index ${teacher}`)
  }

  const handleDelete = (teacher: Teacher) => {
    console.log(`Delete teacher at index ${teacher}`)
    setTeacherToDelete(teacher);
    setShowDeleteDialog(true);
  }

  const handleConfirmDelete = (teacher: Teacher | null | undefined) => {
    // Lógica para eliminar el profesor del backend
    // ...
    console.log('El teacher a eliminar', teacher)
    setShowDeleteDialog(false);
    setTeacherToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
    setTeacherToDelete(null);
  };
  return (
    <>
    
    <TableContainer component={Paper}>
      <Table aria-label='teachers table'>
        <TableHead>
          <TableRow sx={{ backgroundColor: "lightgray" }}>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellido</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Opciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teachers.map((teacher, index) => (
            <TableRow key={index}>
              <TableCell>{teacher.nombre}</TableCell>
              <TableCell>{teacher.apellido}</TableCell>
              <TableCell>{teacher.email}</TableCell>
              <TableCell>
                <IconButton color='primary' onClick={() => handleEdit(teacher)}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  color='error'
                  onClick={() => handleDelete(teacher)}
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
        <DialogTitle textAlign='center' sx={{ bgcolor: '#9b0000', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center'}} ><WarningIcon/>Confirmar eliminación</DialogTitle>
        <DialogContent sx={{margin: 2, textSize: '22px'}}>
          ¿Estás seguro de que deseas eliminar al profesor {teacherToDelete?.nombre} {teacherToDelete?.apellido}?
        </DialogContent>
        <DialogActions sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Button variant="contained" onClick={handleCancelDelete} sx={{ bgcolor: theme.palette.primary.dark, color: 'white' }}>Cancelar</Button>
          <Button variant="contained" onClick={() => handleConfirmDelete(teacherToDelete)} color='error'>Eliminar</Button>
        </DialogActions>
      </Dialog>
    </Box>
    </>
  )
}
