import { CustomThemeProvider } from 'theme/provider'
import { Button, Footer } from 'components'

function App() {
  return (
    <CustomThemeProvider>
      <Button text="Adicionar" iconLeft={<>+</>} />
      <Footer />
    </CustomThemeProvider>
  )
}

export default App
