import { publicProcedure, cpfProcedure, router } from "../context";
import { prisma } from "../../../lib/prisma";
import { addPhoneInput, getPhoneByIdInput, editPhoneInput } from "./phone.zod";
import * as z from "zod";

// "Endpoints"
export const phoneRoutes = router({
  getPhones: cpfProcedure.query(async ({ ctx }) => {
    const phones = await prisma.phone.findMany();

    // "color" no Prisma está como string, o enum está no zod,
    // então aqui ele omite o type do Prisma e adiciona o enum do zod
    type phone = Omit<typeof phones[number], "color"> & {
      color: z.infer<typeof addPhoneInput>["color"];
    };

    return phones as phone[];
  }),
  getPhoneById: cpfProcedure
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
  addPhone: cpfProcedure.input(addPhoneInput).mutation(async ({ input }) => {
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
  editPhoneById: cpfProcedure
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
  deletePhoneById: cpfProcedure
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
