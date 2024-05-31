import { Button, Grid, Typography } from "@mui/material"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';

import { theme } from '../../theme'
import { HomeAppLayout } from "../../Home/layout/HomeAppLayout"
import { TeachersTable } from "../components/TechersTable";

export const TeachersPage = () => {
  const navigate = useNavigate();
  return (
    <HomeAppLayout>
        <Typography variant="h4" component='div' textAlign='center' paddingBottom={3}>Gestión de Profesores</Typography>
        <Divider />
        <Grid container direction={"row"} justifyContent={"space-between"} alignItems={"center"} paddingTop={2}>
          <Button variant="contained" sx={{ bgcolor: theme.palette.primary.dark, color: 'white' }}  onClick={() => navigate('/home')}><ArrowBackIosIcon/>Atrás</Button>
          <Button variant="contained" color="success" onClick={() => navigate('/teachers/new-teacher')}><AddIcon/>Nuevo Profesor</Button>
        </Grid>
        <Grid container padding={3}>
          <TeachersTable/>
        </Grid>
    </HomeAppLayout>
  )
}
