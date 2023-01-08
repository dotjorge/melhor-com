import { Button, Input, Link } from 'components'
import Styled from './AddOrEdit.styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { FC } from 'types'

const required = z.string().min(2, { message: 'Campo obrigatório' }).max(255)

const schema = z.object({
  model: required,
  brand: z.string().min(1, { message: 'Campo obrigatório' }),
  color: z.string().min(1, { message: 'Campo obrigatório' }),
  price: z.string().min(1, { message: 'Campo obrigatório' }),
  'sales-start': z.string().min(1, { message: 'Campo obrigatório' }),
  'sales-end': z.string().min(1, { message: 'Campo obrigatório' })
})

type fields = z.infer<typeof schema>

interface IAddOrEditPhone {
  phone?: any
}

export const AddOrEditPhone: FC<IAddOrEditPhone> = ({ phone }) => {
  phone = {
    id: '1',
    model: 'Galaxy 5',
    brand: 'Sansung',
    price: '900',
    date: '26/04/2019',
    endDate: '12/12/2022',
    color: 'BLACK',
    code: '#12212'
  }

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
      'sales-start': phone?.date,
      'sales-end': phone?.endDate
    },
    resolver: zodResolver(schema)
  })

  return (
    <>
      <h2>{isAddingNew ? 'Adicionar' : 'Editar'} produto</h2>
      <Styled.Form
        onSubmit={handleSubmit(data => {
          console.log(data)
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
          error={errors?.['sales-start']?.message}
          {...register('sales-start')}
        />

        <Input
          label="Fim das vendas"
          placeholder="14/06/2020"
          error={errors?.['sales-end']?.message}
          {...register('sales-end')}
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
