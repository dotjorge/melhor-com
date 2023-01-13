import { Button, Input, Link } from 'components'
import Styled from './AddOrEdit.styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { FC } from 'types'
import { addPhoneInput } from '@monorepo/zod'

// type fields = Omit<z.infer<typeof addPhoneInput>, 'price'> & { price: number }
type fields = z.infer<typeof addPhoneInput>

interface IAddOrEditPhone {
  phone?: fields | null | undefined
  onTest?: () => void
}

export const AddOrEditPhone: FC<IAddOrEditPhone> = ({ phone, onTest }) => {
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
      startDate: phone?.startDate,
      endDate: phone?.endDate
    },
    resolver: zodResolver(addPhoneInput)
  })

  return (
    <>
      <h2>{isAddingNew ? 'Adicionar' : 'Editar'} produto</h2>
      <Styled.Form
        onSubmit={handleSubmit(data => {
          console.log(data, isAddingNew)
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
          error={errors?.price?.message}
          type="number"
          {...(register('price'),
          {
            valueAsNumber: true
          })}
        />

        <Input
          label="Inicio das vendas"
          placeholder="15/03/2020"
          error={errors?.['startDate']?.message}
          {...register('startDate')}
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
          <Button text={'Mutate'} type="button" onClick={onTest} />
        </Styled.Buttons>
      </Styled.Form>
    </>
  )
}
