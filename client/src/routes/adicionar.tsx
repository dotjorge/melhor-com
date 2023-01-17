import { AddOrEditPhone } from 'screens'
import { trpc } from 'trpc/client'
import { useNavigate } from 'react-router-dom'
import { dayJsAdpt } from 'dates'

export const AddPhone = () => {
  const navigate = useNavigate()
  const utils = trpc.useContext()

  const addPhone = trpc.addPhone.useMutation({
    onError: error => console.log('#onError', error.message),
    onSuccess: () => {
      utils.invalidate()
      navigate(`/`)
    }
  })

  // Erro Zod Backend, provavelmente não vai cair aqui por os campos possuem a mesma validação!
  if (addPhone.error?.data?.zodError) {
    console.error('#zodError', addPhone.error?.data?.zodError)
  }

  return (
    <AddOrEditPhone
      isLoading={addPhone.isLoading}
      onSubmit={data => {
        const newPhoneInput = {
          brand: data.brand,
          color: data.color,
          startDate: dayJsAdpt.date(data.startDate).toDate(),
          endDate: dayJsAdpt.date(data.endDate).toDate(),
          model: data.model,
          price: data.price
        } satisfies typeof data

        addPhone.mutate(newPhoneInput)
      }}
    />
  )
}
