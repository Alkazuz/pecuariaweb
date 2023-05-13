import { AppProps } from 'next/app'
import Head from 'next/head'

import { ChakraProvider } from '@chakra-ui/react'
import { CHACKRA_UI_THEME } from 'constants/app'
import { AuthProvider } from 'contexts/AuthContext'

export default function Dashboard() {
  return <h1>Teste</h1>
}
