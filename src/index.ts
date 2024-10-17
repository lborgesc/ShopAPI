import 'express-async-errors';
import http from 'http';
import express from 'express';
import { type Request, type Response } from 'express';
import user from './controllers/user.ts';
import item from './controllers/item.ts';
import { DatabaseSync } from 'node:sqlite';
import onError from './middlewares/on-error.ts';
import { UserService } from './services/user.ts';

async function main() {
  const database = new DatabaseSync(':memory:');
  const userService = new UserService(database);
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
  `);

  const app = express();
  const server = http.createServer(app);
  app.set('database', database);
  app.set('userService', userService);
  app.use(express.json());
  app.use(onError);
  app.use('/user', user);
  app.use('/item', item);

  server.listen(3000);
}

main();
