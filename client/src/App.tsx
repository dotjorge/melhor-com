import { CustomThemeProvider } from 'theme/provider'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from 'routes/home'
import { AddPhone } from 'routes/adicionar'
import { EditPhone } from 'routes/editar'
import { Footer, Header } from 'components'
import { useState } from 'react'
import { httpBatchLink } from '@trpc/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { trpc } from 'trpc/client'
import superjson from 'superjson'
import { ChakraProvider } from '@chakra-ui/react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import './dates/locale'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/adicionar',
    element: <AddPhone />
  },
  {
    path: '/editar/:id',
    element: <EditPhone />
  }
])

function App() {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      transformer: superjson,
      links: [
        httpBatchLink({
          url: 'http://localhost:4000/trpc',
          // CPF no header em todas as requests
          headers() {
            return {
              cpf: '04925787454'
            }
          }
        })
      ]
    })
  )

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ChakraProvider>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            <CustomThemeProvider>
              <Header />
              <main>
                <RouterProvider router={router} />
              </main>
              <Footer />
            </CustomThemeProvider>
          </QueryClientProvider>
        </trpc.Provider>
      </ChakraProvider>
    </LocalizationProvider>
  )
}

export default App
