import { useForm } from 'react-hook-form'
import { AddOrEditPhone } from 'screens'
import { trpc } from 'trpc/client'
import { addPhoneInput } from '@monorepo/zod'
import DayJsAdapter from '@date-io/dayjs'
import * as z from 'zod'

const dayJs = new DayJsAdapter()

type fields = z.infer<typeof addPhoneInput>

export const AddPhone = () => {
  const addPhone = trpc.addPhone.useMutation({
    onError: error => console.log('#onError', error.message),
    onMutate: data => console.log('#mutate', data)
  })

  if (addPhone.error?.data?.zodError) {
    console.log('#', addPhone.error?.data?.zodError)
  }

  return (
    <AddOrEditPhone
      onTest={() => {
        const input = {
          brand: 'Brand',
          color: 'BLACK',
          startDate: dayJs.date('08/01/2023').toDate(),
          endDate: dayJs.date('08/01/2023').toDate(),
          model: 'J5',
          price: 1500
        } satisfies fields

        console.log('#input', input)

        addPhone.mutate(input)
      }}
    />
  )
}
