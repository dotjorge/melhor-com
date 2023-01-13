import { Button, DatePicker, Input, Link, MaterialInput } from 'components'
import Styled from './AddOrEdit.styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { FC } from 'types'
import { addPhoneInput } from '@monorepo/zod'
import { useEffect } from 'react'
import dayjs from 'dayjs'

// type fields = Omit<z.infer<typeof addPhoneInput>, 'price'> & { price: number }
type fields = z.infer<typeof addPhoneInput>

interface IAddOrEditPhone {
  phone?: fields | null | undefined
  onSubmit: (data?: fields) => void
  onTest?: () => void
}

export const AddOrEditPhone: FC<IAddOrEditPhone> = ({
  phone,
  onSubmit,
  onTest
}) => {
  const isAddingNew = !phone

  const {
    control,
    register,
    handleSubmit,
    watch,
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

  const values = watch()

  useEffect(() => {
    console.log('#watch', dayjs(watch().startDate).format('DD/MM/YYYY'))
  }, [values])

  return (
    <>
      <h2>{isAddingNew ? 'Adicionar' : 'Editar'} produto</h2>

      <Styled.Form
        onSubmit={handleSubmit(data => {
          onSubmit(data)
        })}
      >
        <Input
          label="Modelo"
          placeholder="XT2041-1"
          error={errors}
          {...register('model')}
        />

        <Input
          label="Marca"
          placeholder="Motorola"
          {...register('brand')}
          error={errors}
        />

        <Input
          label="Cor"
          placeholder="Preto"
          {...register('color')}
          error={errors}
        />

        <MaterialInput
          control={control}
          label="Preço"
          placeholder="1.400,00"
          type="number"
          {...register('price')}
        />

        <DatePicker
          name="startDate"
          control={control}
          label="Fim das vendas"
          placeholder="14/06/2020"
          error={errors}
        />

        <DatePicker
          name="endDate"
          control={control}
          label="Fim das vendas"
          placeholder="14/06/2020"
          error={errors}
        />

        <div></div>

        <Styled.Buttons>
          <Link to="/" text="Voltar" />
          <Button text={isAddingNew ? 'Adicionar' : 'Salvar'} type="submit" />
          <Button text={'Mutate'} type="button" onClick={onTest} />
        </Styled.Buttons>
      </Styled.Form>

      <div>{JSON.stringify(phone)}</div>
      <div>{JSON.stringify(watch())}</div>
    </>
  )
}
