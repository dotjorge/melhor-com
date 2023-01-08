import { CustomThemeProvider } from 'theme/provider'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from 'routes/home'
import { AddPhone } from 'routes/adicionar'
import { Footer, Header } from 'components'

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
  return (
    <CustomThemeProvider>
      <Header />
      <main>
        <RouterProvider router={router} />
      </main>
      <Footer />
    </CustomThemeProvider>
  )
}

export default App
