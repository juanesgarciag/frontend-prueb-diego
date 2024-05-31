import { Box, Toolbar } from "@mui/material"
import React, { ReactNode } from "react"
import { NavBar } from "../components/NavBar"

interface HomeAppLayoutProps {
    children: ReactNode
}

export const HomeAppLayout: React.FC<HomeAppLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
        <NavBar />
        <Box component='main' sx={{ flexGrow: 1, p: 3}}>
            <Toolbar />
            {children}
        </Box>
    </Box>
  )
}
