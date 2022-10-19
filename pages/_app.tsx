import '../styles/globals.css'
import { SSRProvider } from '@react-aria/ssr';
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
      <Component {...pageProps} />
    </SSRProvider>
  )
}

export default MyApp
