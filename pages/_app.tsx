// pages/_app.tsx
import { AppProps } from 'next/app';
import { Hydrate, QueryClientProvider } from 'react-query';
import { createTheme, MantineProvider } from '@mantine/core';
import { queryClient } from '../src/api';
import { SessionProvider } from "next-auth/react"
import '../styles/global.css';
import '@mantine/core/styles.css';


const theme = createTheme({
    /** Put your mantine theme override here */
});

function MyApp({ 
    Component, 
    pageProps:{
        session, 
        ...pageProps
    } 
}: AppProps) {
    return (
        <QueryClientProvider client={queryClient} >
            <Hydrate state={pageProps.dehydratedState}>
                <MantineProvider theme={theme}>
                    <SessionProvider session={session}>
                        <Component {...pageProps} />
                    </SessionProvider>
                </MantineProvider>
            </Hydrate>
        </QueryClientProvider>   
    );
}

export default MyApp;