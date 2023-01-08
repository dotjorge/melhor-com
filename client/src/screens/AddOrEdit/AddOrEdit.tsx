import { Button, Input, Link } from 'components'
import Styled from './AddOrEdit.styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { FC } from 'types'
import { api } from 'services/api'
import { trpc } from 'trpc/client'

const required = z.string().min(2, { message: 'Campo obrigatório' }).max(255)

const schema = z.object({
  model: required,
  brand: z.string().min(1, { message: 'Campo obrigatório' }),
  color: z.string().min(1, { message: 'Campo obrigatório' }),
  price: z.string().min(1, { message: 'Campo obrigatório' }),
  date: z.string().min(1, { message: 'Campo obrigatório' }),
  endDate: z.string().min(1, { message: 'Campo obrigatório' })
})

type fields = z.infer<typeof schema>

interface IAddOrEditPhone {
  phone?: any
}

export const AddOrEditPhone: FC<IAddOrEditPhone> = ({ phone }) => {
  const isAddingNew = !phone

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<fields>({
    defaultValues: {
      model: phone?.model,
      brand: phone?.brand,
      color: phone?.color,
      price: phone?.price,
      date: phone?.date,
      endDate: phone?.endDate
    },
    resolver: zodResolver(schema)
  })

  const teste = trpc.addPhone.useMutation({
    onError: error => console.log('#onError', error.message),
    onMutate: data => console.log('#mutate', data)
  })

  if (teste.error?.data?.zodError) {
    console.log('#', teste.error?.data?.zodError)
    // zodError will be inferred
    return (
      <pre>Error: {JSON.stringify(teste.error.data.zodError, null, 2)}</pre>
    )
  }

  return (
    <>
      <h2>{isAddingNew ? 'Adicionar' : 'Editar'} produto</h2>
      <Styled.Form
        onSubmit={handleSubmit(data => {
          // api.post('/phone', { body: { ...data, code: '#12212' } })

          console.log(data, isAddingNew)

          teste.mutate({
            brand: 'Brand',
            code: '#12121d',
            color: 'BLACK',
            date: '08/01/2023',
            endDate: '08/01/2023',
            model: 'J5',
            price: '1500'
          })
        })}
      >
        <Input
          label="Modelo"
          placeholder="XT2041-1"
          error={errors?.model?.message}
          {...register('model')}
        />

        <Input
          label="Marca"
          placeholder="Motorola"
          {...register('brand')}
          error={errors?.brand?.message}
        />

        <Input
          label="Cor"
          placeholder="Preto"
          {...register('color')}
          error={errors?.color?.message}
        />

        <Input
          label="Preço"
          placeholder="1.400,00"
          {...register('price')}
          error={errors?.price?.message}
        />

        <Input
          label="Inicio das vendas"
          placeholder="15/03/2020"
          error={errors?.['date']?.message}
          {...register('date')}
        />

        <Input
          label="Fim das vendas"
          placeholder="14/06/2020"
          error={errors?.['endDate']?.message}
          {...register('endDate')}
        />

        <div></div>

        <Styled.Buttons>
          <Link to="/" text="Voltar" />
          <Button text={isAddingNew ? 'Adicionar' : 'Salvar'} type="submit" />
        </Styled.Buttons>
      </Styled.Form>
    </>
  )
}
