import { Router, type Request, type Response } from 'express';
import { CartService } from '#src/services/cart.ts';
import { z } from 'zod';

const router = Router();

const CartSchema = z.object({
  total_amount: z.number(),
  status: z.string(),
});

type Cart = z.infer<typeof CartSchema>;

const AllOptionalCartSchema = CartSchema.partial();
type AllOptionalCart = z.infer<typeof AllOptionalCartSchema>;


router.post('', (req: Request, res: Response) =>{
  const cart: Cart = req.body;
  const id_user = req.params.id;

  const svc = req.app.get('cartService') as CartService;
  svc.create(cart, id_user);
  res.status(200).send(true);
})

export default router;
