import { Request, Response } from "express";
import CardsService from "../../services/CardsService";
import { checkKeys } from "../../shared/Validators";

const CardsController = {
    getAll: async (req:Request, res: Response) => {
        try {
            const users = await CardsService.getAll();
            res.status(200).send(users);
        } catch (error) {
            console.log(error.stack && error.stack || error);
            res.status(500).send({
                error: true,
                msg: error
            })
        }
    },

    create: async (req: Request, res: Response) => {
        
        try{
            checkKeys(["TipoDocumento", "Documento"], req.body)
            const user = req.body;
            res.status(201).send(await CardsService.create(user));
        } catch (error) {
            console.log(error.stack && error.stack || error);
            res.status(500).send({
                error: true,
                msg: error
            })
        }
    },

    update: async (req: Request, res: Response) => {
        
        try{
            checkKeys(["id"], req.body)
            const user = req.body;
            res.status(201).send(await CardsService.update(user));
        } catch (error) {
            console.log(error.stack && error.stack || error);
            res.status(500).send({
                error: true,
                msg: error
            })
        }
    },

    delete: async (req: Request, res: Response) => {
        try{
            checkKeys(["id"], req.body)
            const id = req.body.id;
            res.status(201).send(await CardsService.delete(id));
        } catch (error) {
            console.log(error.stack && error.stack || error);
            res.status(500).send({
                error: true,
                msg: error
            })
        }
    }
}

export default CardsController;