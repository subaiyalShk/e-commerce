// pages/_app.tsx
import { AppProps } from 'next/app';
import { Hydrate, QueryClientProvider } from 'react-query';
import { createTheme, MantineProvider } from '@mantine/core';
import { queryClient } from '../src/api';
import '../styles/global.css';
import '@mantine/core/styles.css';


const theme = createTheme({
    /** Put your mantine theme override here */
});

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient} >
            <Hydrate state={pageProps.dehydratedState}>
                <MantineProvider theme={theme}>
                    <Component {...pageProps} />
                </MantineProvider>
            </Hydrate>
        </QueryClientProvider>   
    );
}

export default MyApp;