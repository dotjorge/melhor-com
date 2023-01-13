import * as z from "zod";
import dayjs from "dayjs";

export const phoneDate = z.any().refine((date) => {
  return dayjs(date).isValid();
  // return date < new Date(Date.now());
}, "Data inválida");
