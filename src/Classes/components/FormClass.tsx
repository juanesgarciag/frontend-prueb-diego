import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material"
import { Controller, useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { theme } from "../../theme"
import { Student } from "../../interfaces/students.interface"
import { Classes } from "../../interfaces/classes.interface"
import { Teacher } from "../../interfaces/teachers.interface"
import axios from "axios"

interface ClassesFormProps {
  onSave: (classes: Classes) => void
  onCancel: () => void
  resetForm: boolean
  initialData?: Classes
}

const classesSchema = yup.object().shape({
  nombreClase: yup.string().required("El nombre es requerido"),
  descripcionClase: yup.string().required("La descripción es requerida"),
  profesor: yup.string().required("El profesor es requerido"),
  estudiantes: yup
    .array()
    .of(yup.string())
    .required("Los estudiantes son requeridos"),
})

async function getTeachers(): Promise<Teacher[]> {
  const response = await axios.get("http://localhost:3000/pruebaDiego/teachers")
  console.log("los profes", response.data)
  return response.data
}

async function getStudents(): Promise<Student[]> {
  const response = await axios.get("http://localhost:3000/pruebaDiego/students")
  console.log('los estudiantes', response.data)
  return response.data
}

export const FormClasses: React.FC<ClassesFormProps> = ({
  onSave,
  onCancel,
  resetForm,
  initialData,
}) => {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<Classes>({
    resolver: yupResolver(classesSchema),
  })

  useEffect(() => {
    const fetchTeachersAndStudents = async () => {
      const teachersData: Array<Teacher> = await getTeachers()
      setTeachers(teachersData)
      const studentsData: Array<Student> = await getStudents()
      setStudents(studentsData)
    }
    fetchTeachersAndStudents()
  }, [])

  const handleSave = (data: Classes) => {
    onSave(data)
  }

  useEffect(() => {
    if (resetForm) {
      reset()
    }
  }, [resetForm, reset])

  useEffect(() => {
    if (initialData) {
      setValue("nombreClase", initialData.nombreClase)
      setValue("descripcionClase", initialData.descripcionClase)
      setValue("profesor", initialData.profesor)
      setValue("estudiantes", initialData.estudiantes)
    }
  }, [initialData, setValue])

  const handleCancel = () => {
    reset()
    onCancel()
  }
  return (
    <>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit(handleSave)}>
            <TextField
              label='Nombre Clase'
              {...register("nombreClase", { required: true })}
              error={!!errors.nombreClase}
              helperText={errors.nombreClase?.message}
              fullWidth
              margin='normal'
            />
            <TextField
              label='Descripción de la clase'
              {...register("descripcionClase", { required: true })}
              error={!!errors.descripcionClase}
              helperText={errors.descripcionClase?.message}
              fullWidth
              margin='normal'
            />
            {/* <TextField
              select
              label='Profesor'
              {...register("profesor", {
                required: true,
              })}
              error={!!errors.profesor}
              helperText={errors.profesor?.message}
              fullWidth
              margin='normal'
            > 
                {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.nombre}{" "}{teacher.apellido}
                </option>
              ))}
            </TextField> */}
            <FormControl fullWidth margin='normal' error={!!errors.profesor}>
              <InputLabel>Profesor</InputLabel>
              <Select
                label='Profesor'
                {...register("profesor", { required: true })}
                defaultValue=''
                onChange={(e) => setValue("profesor", e.target.value)}
              >
                {teachers.map((teacher) => (
                  <MenuItem key={teacher.id} value={teacher.id}>
                    {teacher.nombre} {teacher.apellido}
                  </MenuItem>
                ))}
              </Select>
              {errors.profesor && <p>{errors.profesor.message}</p>}
            </FormControl>
            <FormControl fullWidth margin="normal" error={!!errors.estudiantes}>
              <Controller
                name="estudiantes"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    multiple
                    options={students}
                    getOptionLabel={(option) => `${option.nombre} ${option.apellido}`}
                    defaultValue={[]}
                    onChange={(_, value) => field.onChange(value.map((v) => v.id))}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          key={option.id}
                          label={`${option.nombre} ${option.apellido}`}
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Estudiantes"
                        placeholder="Selecciona estudiantes"
                        error={!!errors.estudiantes}
                        helperText={errors.estudiantes?.message}
                      />
                    )}
                  />
                )}
              />
              {errors.estudiantes && <p>{errors.estudiantes.message}</p>}
            </FormControl>
            <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Box style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant='contained'
                  onClick={handleCancel}
                  sx={{
                    bgcolor: theme.palette.primary.dark,
                    color: "white",
                    marginRight: 2,
                  }}
                >
                  Cancelar
                </Button>
                <Button type='submit' color='success' variant='contained'>
                  {initialData ? "Actualizar" : "Guardar"}
                </Button>
              </Box>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </>
  )
}
