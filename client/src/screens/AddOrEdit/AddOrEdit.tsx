import {
  Button,
  DatePicker,
  Input,
  Link,
  MaterialInput,
  Select,
  TextField
} from 'components'
import Styled from './AddOrEdit.styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { FC } from 'types'
import { addPhoneInput } from '@monorepo/zod'
import { useEffect } from 'react'
import dayjs from 'dayjs'
import { dayJsAdpt } from 'dates'

// type fields = Omit<z.infer<typeof addPhoneInput>, 'price'> & { price: number }
type fields = z.infer<typeof addPhoneInput>

interface IAddOrEditPhone {
  phone?: fields | null | undefined
  onSubmit: (data: fields) => void
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
      // Começa com uma data vazia se não houver data
      startDate: phone?.startDate || '',
      endDate: phone?.endDate || ''
    },
    resolver: zodResolver(addPhoneInput)
  })

  // Todos os valores dos inputs
  const values = watch()

  const hasNoChange = () => {
    let disabled = true

    const keys = Object.keys(values) as Array<keyof typeof values>

    keys.map(key => {
      // É uma data
      if (key === 'startDate' || key === 'endDate') {
        // Comparar se é a mesma com o dayJs
        if (!dayJsAdpt.date(values?.[key])?.isSame(phone?.[key])) {
          disabled = false
        }
        // Não testar a comparação abaixo, daria sempre false porque
        // os objetos de datas mesmo sendo a mesma dão false
        return
      }

      // Checa se a string/number do celular no banco é o mesmo do input
      if (values?.[key] !== phone?.[key]) {
        disabled = false
      }
    })

    return disabled
  }

  const hasAllInputsEmpty = () => {
    let disabled = true

    const keys = Object.keys(values) as Array<keyof typeof values>

    keys.map(key => {
      if (values?.[key]) {
        disabled = false
      }
    })

    return disabled
  }

  return (
    <Styled.Container>
      <h2>{isAddingNew ? 'Adicionar' : 'Editar'} produto</h2>

      <Styled.Form
        onSubmit={handleSubmit(data => {
          onSubmit(data)
        })}
      >
        <TextField
          name="model"
          label="Modelo"
          placeholder="XT2041-1"
          control={control}
          error={errors}
        />

        <TextField
          name="brand"
          label="Marca"
          placeholder="Motorola"
          control={control}
          error={errors}
        />

        <Select
          control={control}
          name="color"
          label="Cor"
          placeholder="Preto"
          error={errors}
        />

        <TextField
          name="price"
          label="Preço"
          placeholder="R$ 1.500"
          control={control}
          error={errors}
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
          <Button
            text={isAddingNew ? 'Adicionar' : 'Salvar'}
            type="submit"
            disabled={hasNoChange() || hasAllInputsEmpty()}
          />
        </Styled.Buttons>
      </Styled.Form>
    </Styled.Container>
  )
}
