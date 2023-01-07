import { CustomThemeProvider } from 'theme/provider'
import { Button } from 'components'

function App() {
  return (
    <CustomThemeProvider>
      <Button text="Adicionar" iconLeft={<>+</>} />
      Teste texto com fonte
    </CustomThemeProvider>
  )
}

export default App
