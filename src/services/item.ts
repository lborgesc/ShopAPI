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

  create(i: Item){
    try {
        const insert = this.db.prepare('INSERT INTO itens (product, price, reviews) VALUES (?, ?, ?)');
        insert.run(i.product, i.price, i.reviews);
        return true;
    } catch (error) {
        return false;
    }
  }

  update(i: Item, id: string){
    try {
        const update = this.db.prepare('UPDATE itens SET product = ?, price = ?, reviews = ? WHERE id = ?');
        update.run(i.product, i.price, i.reviews, id);
        return true;
    } catch (error) {
        return false;
    }
  }

  get(){
    try {
        const itens = this.db.prepare('SELECT * FROM itens').all() as Item[];
        return itens;
    } catch (error) {
        return false;
    }
  }
};


