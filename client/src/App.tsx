import { CustomThemeProvider } from 'theme/provider'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from 'routes/home'
import { AddPhone } from 'routes/adicionar'
import { Footer, Header } from 'components'
import { useState } from 'react'
import { httpBatchLink } from '@trpc/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { trpc } from 'trpc/client'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/adicionar',
    element: <AddPhone />
  }
])

function App() {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:4000/trpc'
        })
      ]
    })
  )

  return (
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
  )
}

export default App
