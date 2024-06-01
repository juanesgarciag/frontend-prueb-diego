import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    TextField,
  } from "@mui/material"
  import { useForm } from "react-hook-form"
  import { useEffect } from "react"
  import { yupResolver } from "@hookform/resolvers/yup"
  import * as yup from "yup"
  
  import { theme } from "../../theme"
import { Student } from "../../interfaces/students.interface"
  
  interface StudentFormProps {
    onSave: (student: Student) => void
    onCancel: () => void
    resetForm: boolean
    initialData?: Student
  }
  
  const studentSchema = yup.object().shape({
    nombre: yup.string().required("El nombre es requerido"),
    apellido: yup.string().required("El apellido es requerido"),
    email: yup
      .string()
      .email("El correo electrónico no es válido")
      .required("El correo electrónico es requerido"),
  })
  
  export const FormStudents: React.FC<StudentFormProps> = ({
    onSave,
    onCancel,
    resetForm,
    initialData,
  }) => {
    const {
      register,
      handleSubmit,
      reset,
      setValue,
      formState: { errors },
    } = useForm<Student>({
      resolver: yupResolver(studentSchema),
    })
  
    const handleSave = (data: Student) => {
      onSave(data)
    }
  
    useEffect(() => {
      if (resetForm) {
        reset()
      }
    }, [resetForm, reset])
  
    useEffect(() => {
      if (initialData) {
        setValue("nombre", initialData.nombre)
        setValue("apellido", initialData.apellido)
        setValue("email", initialData.email)
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
                label='Nombre'
                {...register("nombre", { required: true })}
                error={!!errors.nombre}
                helperText={errors.nombre?.message}
                fullWidth
                margin='normal'
              />
              <TextField
                label='Apellido'
                {...register("apellido", { required: true })}
                error={!!errors.apellido}
                helperText={errors.apellido?.message}
                fullWidth
                margin='normal'
              />
              <TextField
                label='Correo electrónico'
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "El correo electrónico no es válido",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                fullWidth
                margin='normal'
              />
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
  