import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://phones--melhorcom.repl.co',
  headers: {
    timeout: 1000,
    cpf: '04925787454'
  }
})
