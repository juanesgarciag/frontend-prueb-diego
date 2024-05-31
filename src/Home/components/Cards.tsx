// src/components/Dashboard.tsx
import React from 'react';
import { Card, CardContent, CardActions, Button, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import ClassIcon from '@mui/icons-material/Class';

const navItems = [
  { label: 'Profesores', icon: <SchoolIcon fontSize="large" />, path: '/teachers' },
  { label: 'Estudiantes', icon: <PeopleIcon fontSize="large" />, path: '/students' },
  { label: 'Clases', icon: <ClassIcon fontSize="large" />, path: '/classes' },
];

export const CardComponent: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={2} justifyContent="center">
      {navItems.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.label}>
          <Card>
            <CardContent>
              {item.icon}
              <Typography variant="h5" component="div">
                {item.label}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Gestiona {item.label.toLowerCase()}.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary" onClick={() => navigate(item.path)}>
                Ir a {item.label}
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
