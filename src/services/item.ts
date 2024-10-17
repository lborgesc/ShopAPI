import { DatabaseSync } from "node:sqlite";
import { z } from "zod";


export const ItemSchema = z.object({
  product: z.string(),
  price: z.number(),
  reviews: z.number(),
});

export type Item = z.infer<typeof ItemSchema>;


export class ItemService {
  constructor(
    private readonly db:DatabaseSync,
  ){}
};


