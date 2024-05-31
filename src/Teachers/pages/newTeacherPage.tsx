import { Button, Divider, Grid, Typography } from "@mui/material"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"

import { theme } from "../../theme"
import { HomeAppLayout } from "../../Home/layout/HomeAppLayout"
import { useNavigate } from "react-router-dom"
import { FormTeachers } from "../components"
import { Teacher } from "../../interfaces/teachers.interface"

export const NewTeacherPage = () => {
  const navigate = useNavigate()
  const handleSave = (teacher: Teacher) => {
    // Lógica para guardar el nuevo profesor en el backend
    // ...
    console.log('el profe a guardar en newTeacher', teacher)
  };

  const handleCancel = (event: React.FormEvent) => {
    // Lógica para cancelar la creación del nuevo profesor
    // ...
    console.log('el evento al cancelar', event)
  };

  return (
    <HomeAppLayout>
      <Typography
        variant='h4'
        component='div'
        textAlign='center'
        paddingBottom={3}
      >
        Crear un nuevo profesor
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
          onClick={() => navigate("/teachers")}
        >
          <ArrowBackIosIcon />
          Atrás
        </Button>
      </Grid>
      <Grid container spacing={2} sx={{ display: "flex", justifyContent: "center" }}>
        <Grid item xs={12} md={6} >
          <FormTeachers onSave={handleSave} onCancel={() => handleCancel}/>
        </Grid>
      </Grid>
    </HomeAppLayout>
  )
}
