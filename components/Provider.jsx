'use client'

import { SessionProvider } from 'next-auth/react'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

const Provider = ({ children, session }) => {

  const queryClient = new QueryClient()

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default Provider