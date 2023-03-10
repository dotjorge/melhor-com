import * as z from "zod";
import dayjs from "dayjs";

dayjs.locale("pt-br");

// Commons
const requiredMessage = { message: "Campo obrigatório" };
const minimunDate = "25/12/2018";

const phoneDate = z
  .any()
  .refine((date) => {
    return dayjs(date).isValid();
  }, "Data inválida")
  .refine((date) => {
    return dayjs(date).isAfter(dayjs("12-25-2018"));
  }, `Data inferior à ${minimunDate}`);

const textMin1Max255 = z
  .string({
    required_error: requiredMessage.message,
  })
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
  price: z
    .string({
      required_error: requiredMessage.message,
    })
    // .transform((priceString) => priceStringToNumber(priceString))
    .refine(
      (priceString) => {
        const priceNumber = Number(priceString.replace(/[^0-9.-]+/g, ""));

        return !Number.isNaN(priceNumber) && priceNumber > 0;
      },
      {
        message: "Apenas números positivos",
      }
    ),
  startDate: phoneDate,
  endDate: phoneDate,
  color: z.enum(["BLACK", "WHITE", "GOLD", "PINK"], {
    // required_error: requiredMessage.message,
    // invalid_type_error: "Cor inválida",
    errorMap: (issue, ctx) => {
      return { message: "Cor inválida" };
    },
  }),
  // code: z
  //   .string({ invalid_type_error: "Deve ser string" })
  //   .min(6, "Minimo é 6")
  //   .max(6, "Máximo é 6"),
});

export const getPhoneByIdInput = z.string().optional();

export const editPhoneInput = addPhoneInput.merge(
  z.object({
    code: z.number(),
  })
);

export default addPhoneInput;
