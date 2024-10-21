import { DatabaseSync } from "node:sqlite";
import { z } from "zod";

const CartSchema = z.object({
  total_amount: z.number(),
  status: z.string(),
});


type Cart = z.infer<typeof CartSchema>;

const AllOptionalCartSchema = CartSchema.partial();
type AllOptionalCart = z.infer<typeof AllOptionalCartSchema>;


export class CartService{
    constructor(
      private readonly db:DatabaseSync,
    ){}

    create(c: Cart, id_user: string){
      try {
          const insert = this.db.prepare('INSERT INTO carts (id_user, total_amount, status) VALUES (?, ?, ?)');
          insert.run(c.total_amount, c.status, id_user);
          return true;
      } catch (error) {
          return false;
      }
    }
}
