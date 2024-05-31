import { ThemeProvider } from '@emotion/react'
import CssBaseLine from '@mui/material/CssBaseline'
import { theme } from '.'

export const AppTheme = ({ children }: any) => {
  return (
    <ThemeProvider theme={theme}>
        <CssBaseLine />
        {children}
    </ThemeProvider>
  )
}
