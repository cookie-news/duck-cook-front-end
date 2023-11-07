'use client'

import { ThemeProvider as MuiThemeProvider } from "@emotion/react";
import { ReactNode } from "react";

//Themes
import theme from '@/themes'

const ThemeProvider = ({children}:{children: ReactNode}) => <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>

export default ThemeProvider;