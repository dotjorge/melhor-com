import * as z from "zod";

export const addPhoneInput = z.object({
  model: z.string(),
  brand: z.string(),
  price: z.number(),
  startDate: z.date(),
  endDate: z.date(),
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
