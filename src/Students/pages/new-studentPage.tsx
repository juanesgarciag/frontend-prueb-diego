import { Button, Divider, Grid, Typography } from "@mui/material"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import Swal from 'sweetalert2'

import { theme } from "../../theme"
import { HomeAppLayout } from "../../Home/layout/HomeAppLayout"
import { useLocation, useNavigate } from "react-router-dom"
import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { Student } from "../../interfaces/students.interface"
import { FormStudents } from "../components"

export const NewStudentPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  
  const [error, setError] = useState(null);
  const [save, setSave] = useState(null)
  const [resetForm, setResetForm] = useState(false)
  const [initialData, setInitialData] = useState<Student | undefined>(location.state?.student || null)

  const handleSave = async(student: Student) => {
      try {
        const axiosUrl = initialData ? await axios.patch(`http://localhost:3000/pruebaDiego/students/${initialData.id}`, student) : await axios.post('http://localhost:3000/pruebaDiego/students', student)
        const response = axiosUrl
        if(response.status === 201 || response.status === 200) {
          setSave(true)
          setResetForm(true)
          setInitialData(null)
        }
        return response.data;
      } catch (error) {
        const err = error as AxiosError
        setError(err)
        return [];
      }
  };

  const handleCancel = (event: React.FormEvent) => {
    setInitialData(null) // Limpiar initialData al cancelar
    setResetForm(true)
  };

  const handleSuccessAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Éxito",
      text: `El estudiante se ${initialData ? 'actualizó' : 'creó'} correctamente ${JSON.stringify(error)}`,
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const handleErrorAlert = () => {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo guardar el estudiante",
      timer: 5000,
      showConfirmButton: false,
    });
  };

  useEffect(() => {
    if (save) {
      handleSuccessAlert();
    }
    if (error) {
      handleErrorAlert();
    }
    if (resetForm) {
      setResetForm(false) 
    }
  }, [save, error, resetForm]);

  return (
    <HomeAppLayout>
      <Typography
        variant='h4'
        component='div'
        textAlign='center'
        paddingBottom={3}
      >
        {initialData ? 'Actualizar estudiante' : 'Crear un nuevo estudiante'}
      </Typography>
      <Divider />
      <Grid
        container
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        paddingTop={2}
      >
        <Button
          variant='contained'
          sx={{ bgcolor: theme.palette.primary.dark, color: "white" }}
          onClick={() => navigate("/students")}
        >
          <ArrowBackIosIcon />
          Atrás
        </Button>
      </Grid>
      <Grid container spacing={2} sx={{ display: "flex", justifyContent: "center" }}>
        <Grid item xs={12} md={6} >
          <FormStudents onSave={handleSave} onCancel={() => handleCancel} resetForm={resetForm} initialData={initialData}/>
        </Grid>
      </Grid>
    </HomeAppLayout>
  )
}

