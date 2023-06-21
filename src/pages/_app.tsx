import '../styles/globals.css'
import 'remixicon/fonts/remixicon.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
