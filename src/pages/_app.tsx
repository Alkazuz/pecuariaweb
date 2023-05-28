import { AppProps } from 'next/app'
import Head from 'next/head'

import { ChakraProvider } from '@chakra-ui/react'
import { CHACKRA_UI_THEME } from 'constants/app'
import { AuthProvider } from 'contexts/AuthContext'

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={CHACKRA_UI_THEME}>
      <Head>
        <title>Pecuária - Painel Web</title>
        <link rel="shorcut icon" href="/img/bg.png" />
        <link rel="apple-touch-icon" href="/img/bg.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="description" content="Pecuária - Painel Web" />
      </Head>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  )
}

export default App
