import { Router, type Request, type Response } from 'express';
import type { DatabaseSync } from 'node:sqlite';
import { z } from 'zod';

export const ItemSchema = z.object({
  product: z.string(),
  price: z.string(),
  reviews: z.string(),
});

export type Item = z.infer<typeof ItemSchema>;

const router = Router();

router.post('', async ( req: Request, res: Response ) => {
  const item: Item = req.body;

  const database = req.app.get('database') as DatabaseSync;
  const insert = database.prepare('INSERT INTO itens (product, price, reviews) VALUES (?, ?, ?)');
  const result = insert.run(item.product, item.price, item.reviews);
  res.status(200).send(result);
})

router.put('/:id', async (req: Request, res: Response) => {

  const item: Item = req.body;
  const id = req.params.id;

  const database = req.app.get('database') as DatabaseSync;
  const update = database.prepare('UPDATE itens SET product = ?, price = ?, reviews = ? WHERE id = ?');
  const result = update.run(item.product, item.price, item.reviews, id);
  res.status(200).send(result);
});

router.get('', async ( req: Request, res: Response) => {
  const database = req.app.get('database') as DatabaseSync;
  const itens = database.prepare('SELECT * FROM itens').all() as Item[];

  res.status(200).send(itens);
})

export default router;
