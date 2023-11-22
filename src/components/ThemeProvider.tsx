'use client'

import { ReactNode } from "react";

//Themes
import theme from '@/themes'
import { ThemeProvider as MuiThemeProvider } from "@emotion/react";

const ThemeProvider = ({children}:{children: ReactNode}) => <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>

export default ThemeProvider;