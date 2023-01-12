import { publicProcedure, router } from "../context";
import { prisma } from "../../../lib/prisma";
import { addPhoneInput } from "./phone.types";

// "Endpoints"
export const phoneRoutes = router({
  getPhones: publicProcedure.query(async () => {
    const phones = await prisma.phone.findMany();
    return phones;
  }),
  addPhone: publicProcedure.input(addPhoneInput).mutation(async ({ input }) => {
    console.log("#input -> server", addPhoneInput);

    const addPhone = await prisma.phone.create({
      data: {
        brand: input.brand,
        color: input.color,
        endDate: input.endDate,
        model: input.model,
        price: input.price,
        startDate: input.startDate,
      },
    });

    return addPhone;
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
