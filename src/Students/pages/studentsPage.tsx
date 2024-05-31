import { Button, Divider, Grid, Typography } from "@mui/material"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import AddIcon from '@mui/icons-material/Add'

import { HomeAppLayout } from "../../Home/layout/HomeAppLayout"
import { useNavigate } from "react-router-dom"

export const StudentsPage = () => {
  const navigate = useNavigate();
  return (
    <HomeAppLayout>
        <Typography variant="h4" component='div' textAlign='center' paddingBottom={3}>Gestión de Estudiantes</Typography>
        <Divider />
        <Grid container direction={"row"} justifyContent={"space-between"} alignItems={"center"} paddingTop={2}>
          <Button variant="contained" onClick={() => navigate('/home')}><ArrowBackIosIcon/>Atrás</Button>
          <Button variant="contained" onClick={() => navigate('/students/new-student')}><AddIcon/>Nuevo Estudiante</Button>
        </Grid>
    </HomeAppLayout>
  )
}
