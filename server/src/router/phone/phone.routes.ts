import { publicProcedure, router } from "../context";
import { prisma } from "../../../lib/prisma";
import { addPhoneInput, getPhoneByIdInput, editPhoneInput } from "./phone.zod";
import * as z from "zod";

// "Endpoints"
export const phoneRoutes = router({
  getPhones: publicProcedure.query(async () => {
    const phones = await prisma.phone.findMany();

    return phones;
  }),
  getPhoneById: publicProcedure
    .input(getPhoneByIdInput)
    .query(async ({ input }) => {
      const code = input as string;
      const codeNumber = Number(code);

      if (isNaN(codeNumber)) {
        return null;
      }

      const phone = await prisma.phone.findUnique({
        where: {
          code: codeNumber,
        },
      });

      // Substitui o tipo do retorno do Prisma e re-aproveita as validaçõoes Zod
      return phone as unknown as z.infer<typeof editPhoneInput>;
    }),
  addPhone: publicProcedure.input(addPhoneInput).mutation(async ({ input }) => {
    const priceNumber = Number(input.price.replace(/[^0-9.-]+/g, ""));

    const addPhone = await prisma.phone.create({
      data: {
        brand: input.brand,
        color: input.color,
        endDate: input.endDate,
        model: input.model,
        price: priceNumber,
        startDate: input.startDate,
      },
    });

    return addPhone;
  }),
  editPhoneById: publicProcedure
    .input(editPhoneInput)
    .mutation(async ({ input }) => {
      const priceNumber = Number(input.price.replace(/[^0-9.-]+/g, ""));

      const editPhone = await prisma.phone.update({
        where: {
          code: input.code,
        },
        data: {
          brand: input.brand,
          color: input.color,
          endDate: input.endDate,
          model: input.model,
          price: priceNumber,
          startDate: input.startDate,
        },
      });

      return editPhone;
    }),
  deletePhoneById: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      const code = input as string;
      const codeNumber = Number(code);

      const phone = await prisma.phone.delete({
        where: {
          code: codeNumber,
        },
      });

      // Substitui o tipo do retorno do Prisma e re-aproveita as validaçõoes Zod
      return phone as unknown as z.infer<typeof editPhoneInput>;
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
