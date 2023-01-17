<h1 align="center">Olá Melhor Comunicação 👋</h1>

> Essa é a documentação do meu teste para a vaga front-end na Melhor Comunicação

## 📌 Sumário

<details open>
<summary>Ir para:</summary>

- [💻 Stack usada](#-stack-usada)
- [🧥 Estilização](#-estilização)
- [🔙 Rotas API](#-rotas-api)
- [🚦 Validações](#-valida%C3%A7%C3%B5es)
- [🔤 Google Fonts](#-google-fonts)
- [🚀 Rodar o projeto](#-rodar-o-projeto)

</details>

## 💻 Stack usada

A Stack escolhida foi ReactJS + NodeJS com tRPC em um Monorepo, apesar da vaga ser apenas de Front-end. E a razão disso foi o backend (https://phones--melhorcom.repl.co) estar aparanetemente quebrado e a vaga de front depender da contração de um back.

## 🧥 Estilização

Os estilos foram feitos usando a biblioteca `styled-components` com TypeScript, no seguinte padrão:

No JSX:

> componente.tsx

```JSX
import Styled from "./component.styles"

export const Componente = (props) => {
  return (
    <Styled.Componente>
        <div className="child">Olá Melhor Comunicação</div>
    </Styled.Componente>
  )
}
```

Nos estilos:

> componente.styles.tsx

```JSX
import styled from "styled-components"

const Componente = styled.div`
  // Container
  display: flex;
  background: blue;

  // Filho
  .child{
    color: black;
  }
`

// Ou
const Child = styled.div`
  // Filho
  color: black;
`

export default { Componente, Child }
```

## 🔙 Rotas API

> Node.js com tRPC em um Monorepo

As rotas API foram feitas no back-end em Node com o tRPC, em uma pasta `server/src/router/routeName/routeName.routes.ts`. E cada "endpoint" conta com uma validação `zod`, em um arquivo na mesma pasta chamado `routeName.zod.ts`, que tipa o consumo dele no front e disponibiliza vários utilitarios de infer e manipulação de tipos.

Depois todas são "juntadas" no `index.js` da pasta router:

```TS
export const appRouter = mergeRouters(phoneRoutes);
```

E o ORM utilizado foi o Prisma com `sq-lite`, apenas pela praticidade.

Todas as rotas tRPC são expostas em um endpoint REST já com as validações, mas a maneira correta de as consumir no front é através do tRPC, pra que os parametros e o retorno do endpoint estejam todos tipados e o fetch seja feito através do React Query:

```TS
const phones = trpc.getPhones.useQuery()

/*
    React Query:

    phones = { data, isLoading, isError, ... }

    data = {
        code: number,
        brand: string,
        color: "BLACK" | "WHITE" | "GOLD" | "PINK",
        startDate: any (no front é string, no back é Date),
        endDate: any (no front é string, no back é Date),
        model: string,
        price: string (no front é string, no banco é Decimal)
    }
 */

```

Resposta ao bater em http://localhost:4000/trpc/getPhones:

```JSON
{
    "result": {
        "data": {
            "json": [
                {
                "code": 14,
                "model": "Redmi 2",
                "price": "400",
                "brand": "Xiaomi",
                "color": "BLACK",
                "startDate": "2023-01-01T03:00:00.000Z",
                "endDate": "2023-01-02T03:00:00.000Z"
                },
                {
                "code": 15,
                "model": "J7 Pro",
                "price": "400",
                "brand": "Samsung",
                "color": "WHITE",
                "startDate": "2023-01-01T03:00:00.000Z",
                "endDate": "2023-01-02T03:00:00.000Z"
                },
                {
                "code": 16,
                "model": "RN 10 Pro",
                "price": "1500",
                "brand": "Xiaomi",
                "color": "GOLD",
                "startDate": "2023-01-01T03:00:00.000Z",
                "endDate": "2023-01-02T03:00:00.000Z"
                },
                {
                "code": 17,
                "model": "14 Pro",
                "price": "10000",
                "brand": "iPhone",
                "color": "PINK",
                "startDate": "2023-01-01T03:00:00.000Z",
                "endDate": "2023-01-02T03:00:00.000Z"
                }
            ],
            "meta": {
                "values": {
                    "0.startDate": [
                        "Date"
                    ],
                    "0.endDate": [
                        "Date"
                    ],
                    "1.startDate": [
                        "Date"
                    ],
                    "1.endDate": [
                        "Date"
                    ],
                    "2.startDate": [
                        "Date"
                    ],
                    "2.endDate": [
                        "Date"
                    ],
                    "3.startDate": [
                        "Date"
                    ],
                    "3.endDate": [
                        "Date"
                    ]
                }
            }
        }
    }
}
```

## 🚦 Validações

Pra validações foi utilizado a biblioteca `zod`, quase sempre no back-end e reaproveitada no front como por exemplo no schema do react-hook-form pra validar os campos com a mesma validação dos parametros do endpoint.

```TS
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

// Gera uma interface TypeScript com base na validação zod do backend no addPhoneInput
type fields = z.infer<typeof addPhoneInput>

// Tipa os campos do useForm com o infer gerado acima
const formMethods = useForm<fields>({
    defaultValues: {
      model: phone?.model,
      brand: phone?.brand,
      color: phone?.color,
      price: phone?.price,
      // Começa com uma data vazia se não houver data
      startDate: phone?.startDate || '',
      endDate: phone?.endDate || ''
    },
    // Valida os campos do front com as mesmas validações do back-end
    resolver: zodResolver(addPhoneInput)
  })
```

## 🔤 Google Fonts

As fontes `Nunite` e `Roboto` foram usadas fazendo um import no próprio css usando o CDN da Google:

```CSS
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800;900&family=Roboto:wght@100;300;400;500;700;900&display=swap');

body {
  font-family: 'Roboto', sans-serif;
}
```

## 🚀 Rodar o projeto

> Não estar rodando nenhum outro projeto na porta 3000 nem 4000 é obrigatório

O projeto precisa apenas de um comando pra ser rodado, que é:

```sh
yarn start
```

### Depois disso já estará rodando tanto o repositório front-end quanto back-end:

#### Front-end:

[http://localhost:3000/](http://localhost:3000/)

#### Back-end:

[http://localhost:4000/](http://localhost:4000/)

Rodar apenas o front-end:

```sh
yarn workspace client start
```

Rodar apenas o back-end:

```sh
yarn workspace server start
```

### Os projetos são rodados nas mesmas rotas anteriormente citadas
