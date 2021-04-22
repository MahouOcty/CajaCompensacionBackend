import { Router } from 'express';
import CardsController from '../controllers/cardsController';


const cardsRouter = Router();

cardsRouter.get("/", CardsController.getAll);

cardsRouter.post("/", CardsController.create);

cardsRouter.put("/", CardsController.update);

cardsRouter.delete("/", CardsController.delete);

export default cardsRouter;