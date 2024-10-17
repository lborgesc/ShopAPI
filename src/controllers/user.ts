import { UserService } from '#src/services/user.ts';
import { Router, type Request, type Response } from 'express';
import { z } from 'zod';

const router = Router();

const UserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type User = z.infer<typeof UserSchema>;

const AllOptionalUserSchema = UserSchema.partial();
type AllOptionalUser = z.infer<typeof AllOptionalUserSchema>;

router.post('', async (req: Request, res: Response) => {
  const { error } = UserSchema.safeParse(req.body);
  if (error) {
    res.status(400).send(error);
    return;
  }

  const user: User = req.body;
  // faz o que tem que fazer

  const svc = req.app.get('userService') as UserService;
  svc.create(user);
  res.status(200).send(true);
});

router.put('/:id', async (req: Request, res: Response) => {
  const { error } = AllOptionalUserSchema.safeParse(req.body);
  if (error) {
    res.status(400).send(error);
  }

  const user: User = req.body;
  const id = req.params.id;


  const svc = req.app.get('userService') as UserService;
  svc.update(user, id);
  res.status(200).send(true);
});

router.get('', async (req: Request, res: Response) => {
  const svc = req.app.get('userService') as UserService;
  const users = await svc.get();
  res.status(200).send(users);
});

export default router;
