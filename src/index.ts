import 'express-async-errors';
import http from 'http';
import express from 'express';
import user from './controllers/user.ts';
import item from './controllers/item.ts';
import cart from './controllers/cart.ts';
import { DatabaseSync } from 'node:sqlite';
import onError from './middlewares/on-error.ts';
import { UserService } from './services/user.ts';
import { ItemService } from './services/item.ts';

async function main() {
  const database = new DatabaseSync(':memory:');
  const userService = new UserService(database);
  const itemService = new ItemService(database);
  database.exec(`
    CREATE TABLE users(
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    ) STRICT;

    CREATE TABLE itens(
      id INTEGER PRIMARY KEY,
      product TEXT NOT NULL,
      price REAL NOT NULL UNIQUE,
      reviews REAL NOT NULL
    ) STRICT;

    CREATE TABLE carts(
    id_cart INTEGER PRIMARY KEY,
    id_user INTEGER NOT NULL,
    total_amount REAL NOT NULL,
    status TEXT NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id)
    ) STRICT;

     CREATE TABLE carts_item(
    id_cart INTEGER NOT NULL,
    id_item INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (id_cart) REFERENCES carts(id_cart),
    FOREIGN KEY (id_item) REFERENCES itens(id)
    ) STRICT;
  `);

  const app = express();
  const server = http.createServer(app);
  app.set('database', database);
  app.set('userService', userService);
  app.set('itemService', itemService);
  app.use(express.json());
  app.use(onError);
  app.use('/user', user);
  app.use('/item', item);
  app.use('/cart', cart);
  server.listen(3000);
}

main();
