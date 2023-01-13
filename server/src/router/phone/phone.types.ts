import * as z from "zod";
import dayjs from "dayjs";

// Commons

const requiredMessage = { message: "Campo obrigatório" };

const phoneDate = z.any().refine((date) => {
  return dayjs(date).isValid();
  // return date < new Date(Date.now());
}, "Data inválida");

const textMin1Max255 = z
  .string()
  .min(1, requiredMessage)
  .refine(
    (val) => {
      return val.replace(" ", "").length < 255;
    },
    {
      message: "Não deve conter mais de 255",
    }
  );

export const addPhoneInput = z.object({
  model: textMin1Max255,
  brand: textMin1Max255,
  // price: z.number(),
  price: z.string().refine(
    (val) => {
      return !Number.isNaN(parseInt(val, 10)) && Number(val) > 0;
    },
    {
      message: "Apenas números positivos",
    }
  ),
  startDate: phoneDate,
  endDate: phoneDate,
  color: z.enum(["BLACK", "WHITE", "GOLD", "PINK"]),
  // code: z
  //   .string({ invalid_type_error: "Deve ser string" })
  //   .min(6, "Minimo é 6")
  //   .max(6, "Máximo é 6"),
});

export const editPhoneInput = z.string().optional();

export const editPhoneOutput = addPhoneInput.merge(
  z.object({
    code: z.string(),
  })
);

export default addPhoneInput;
