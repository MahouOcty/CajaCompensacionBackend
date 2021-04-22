import { Router } from 'express';
import cardsRouter from './cards.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/cards", cardsRouter);

export default routes;