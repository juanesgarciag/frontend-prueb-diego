import {
  AppBar,
  Toolbar,
  IconButton,
  Grid,
  Typography,
  Box,
  Button,
} from "@mui/material"
import SchoolIcon from "@mui/icons-material/School"
import { useNavigate } from "react-router-dom";

const navItems = [
  { label: "Home", path: "/home" },
  { label: "Profesores", path: "/teachers" },
  { label: "Estudiantes", path: "/students" },
  { label: "Clases", path: "/classes" },
]
export const NavBar = () => {
    const navigate = useNavigate();
    
  return (
    <AppBar component='nav' position='fixed' sx={{}}>
      <Toolbar>
        <IconButton color='inherit' edge='start' sx={{ mr: 2 }}>
          <SchoolIcon />
        </IconButton>
        <Grid
          container
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <Typography variant='h6' noWrap component={"div"}>
            Control de clases
          </Typography>
        </Grid>
        <Box
          sx={{
            display: { xs: "none", sm: "block" },
            flexGrow: 1,
            textAlign: "right",
            width: "-webkit-fill-available",
          }}
        >
          {navItems.map((item) => (
            <Button key={item.label} sx={{ color: "#fff" }} onClick={() => navigate(item.path)}>
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
