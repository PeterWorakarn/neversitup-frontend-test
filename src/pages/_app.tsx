import { QueryClient, QueryClientProvider } from 'react-query';
import '../styles/globals.css'
import type { AppProps } from 'next/app'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: 0 },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
export default MyApp
