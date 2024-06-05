// pages/_app.tsx
import { AppProps } from 'next/app';
import { Hydrate, QueryClientProvider } from 'react-query';
import { queryClient } from '../src/api';
import { MantineProvider } from '@mantine/core';
import '../styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient} >
            <MantineProvider>
                <Hydrate state={pageProps.dehydratedState}>
                    <Component {...pageProps} />
                </Hydrate>
            </MantineProvider>
        </QueryClientProvider>   
    );
}

export default MyApp;