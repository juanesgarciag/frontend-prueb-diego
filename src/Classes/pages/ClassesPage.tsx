import { Button, Divider, Grid, Typography } from "@mui/material"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from "react-router-dom"
import { theme } from '../../theme'

import { HomeAppLayout } from "../../Home/layout/HomeAppLayout"
import { ClassesTable } from "../components"

export const ClassesPage = () => {
  const navigate = useNavigate();
  return (
    <HomeAppLayout>
      <Typography variant="h4" component='div' textAlign='center' paddingBottom={3}>Gestión de Clases</Typography>
        <Divider />
        <Grid container direction={"row"} justifyContent={"space-between"} alignItems={"center"} paddingTop={2}>
          <Button variant="contained" sx={{ bgcolor: theme.palette.primary.dark, color: 'white' }} onClick={() => navigate('/home')}><ArrowBackIosIcon/>Atrás</Button>
          <Button variant="contained" color="success" onClick={() => navigate('/students/new-student')}><AddIcon/>Nueva Clase</Button>
        </Grid>
        <Grid container padding={3}>
          <ClassesTable/>
        </Grid>
    </HomeAppLayout>
  )
}
