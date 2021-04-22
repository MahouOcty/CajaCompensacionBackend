import { Router } from 'express';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();

usersRouter.get("/", UsersController.getAll);

usersRouter.post("/", UsersController.create);

usersRouter.put("/", UsersController.update);

usersRouter.delete("/", UsersController.delete);

export default usersRouter;