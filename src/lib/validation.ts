import { z } from "zod";
import { DEFAULT_PET_IMAGE } from "./constants";

export const petFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, { message: "Name is required" })
      .max(100, { message: "Name is required" }),
    ownerName: z
      .string()
      .trim()
      .min(1, { message: "Owner Name is required" })
      .max(100, { message: "Owner Name is required" }),
    age: z.coerce.number().int().positive().max(999),
    notes: z.union([z.literal(""), z.string().trim().max(200)]),
    imageUrl: z.union([
      z.literal(""),
      z.string().trim().url({ message: "Image URL is required" }),
    ]),
  })
  .transform((data) => ({
    ...data,
    imageUrl: data.imageUrl || DEFAULT_PET_IMAGE,
  }));

export type TPetForm = z.infer<typeof petFormSchema>;
