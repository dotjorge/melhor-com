import { publicProcedure, router } from "./context";
import { z } from "zod";

export const addPhoneInput = z.object({
  model: z.string(),
  brand: z.string(),
  price: z.string(),
  date: z.string(),
  endDate: z.string(),
  color: z.enum(["BLACK", "WHITE", "GOLD", "PINK"]),
  code: z
    .string({ invalid_type_error: "Deve ser string" })
    .min(6, "Minimo é 6")
    .max(6, "Máximo é 6"),
});

// "Endpoints"
export const phoneRoutes = router({
  getPhones: publicProcedure.query(({ input }) => {
    return PHONES;
  }),
  addPhone: publicProcedure.input(addPhoneInput).mutation(({ input }) => {
    return input;
  }),
});

const PHONES = [
  {
    model: "Redmi 2",
    brand: "Xiaomi",
    price: "400",
    date: "26/04/2019",
    endDate: "12/12/2022",
    color: "BLACK",
    code: "#12212",
  },
  {
    model: "Galaxy J7 Pro",
    brand: "Samsung",
    price: "400",
    date: "26/04/2019",
    endDate: "12/12/2022",
    color: "BLACK",
    code: "#22212",
  },
  {
    model: "Redmi Note 10 Pro",
    brand: "Xiaomi",
    price: "1500",
    date: "26/04/2019",
    endDate: "12/12/2022",
    color: "WHITE",
    code: "#32212",
  },
  {
    model: "Galaxy S22",
    brand: "Samsung",
    price: "3500",
    date: "26/04/2019",
    endDate: "12/12/2022",
    color: "BLACK",
    code: "#42212",
  },
  {
    model: "Iphone 13 Pro",
    brand: "Apple",
    price: "9000",
    date: "26/04/2019",
    endDate: "12/12/2022",
    color: "BLACK",
    code: "#52212",
  },
  {
    model: "Iphone 14 Pro",
    brand: "Apple",
    price: "9326",
    date: "26/04/2019",
    endDate: "12/12/2022",
    color: "BLACK",
    code: "#52212",
  },
];
