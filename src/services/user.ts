import { z } from 'zod';
import type { DatabaseSync } from 'node:sqlite';

export const UserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
});

export type User = z.infer<typeof UserSchema>;

const AllOptionalUserSchema = UserSchema.partial();
type AllOptionalUser = z.infer<typeof AllOptionalUserSchema>;

export class UserService {
    constructor(
        private readonly db:DatabaseSync,
    ) {}

    create(u: User) {
        try {
            const insert = this.db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)');
            insert.run(u.name, u.email, u.password);
            return true;
        } catch {
            return false;
        }
    }

    update(u: User, id: string) {
        try {
            const update = this.db.prepare('UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?');
            update.run(u.name, u.email, u.password, id);
            return true;
        } catch {
            return false;
        }
    }

    get( ) {
        try {
            const users = this.db.prepare('SELECT * FROM users').all() as User[];
            return users;
        } catch {
            return [];
        }
    }
}
