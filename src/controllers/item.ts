import { Router, type Request, type Response } from 'express';
import { z } from 'zod';
import { ItemService } from '#src/services/item.ts';

export const ItemSchema = z.object({
  product: z.string(),
  price: z.number(),
  reviews: z.number(),
});

export type Item = z.infer<typeof ItemSchema>;

const router = Router();

router.post('', async ( req: Request, res: Response ) => {
  const item: Item = req.body;

  const svc = req.app.get('itemService') as ItemService;
  svc.create(item);
  res.status(200).send(true);
})

router.put('/:id', async (req: Request, res: Response) => {

  const item: Item = req.body;
  const id = req.params.id;

  const svc = req.app.get('itemService') as ItemService;
  svc.update(item, id);
  res.status(200).send(true);
});

router.get('', async ( req: Request, res: Response) => {
  const svc = req.app.get('itemService') as ItemService;
  const items = await svc.get();
  res.status(200).send(items);
})

export default router;
