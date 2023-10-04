import { ThemeProvider } from '@mui/material/styles';

import '../src/root.css'

import theme from '@/themes'

export default function MyApp({ Component, pageProps }) {
    return <ThemeProvider theme={theme}><Component {...pageProps} /></ThemeProvider>
}