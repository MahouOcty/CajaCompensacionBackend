import { Request, Response } from "express";
import UsersService from "../../services/UsersService";
import { checkKeys } from "../../shared/Validators";

const UsersController = {
    getAll: async (req:Request, res: Response) => {
        try {
            const users = await UsersService.getAll();
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
            checkKeys(["Nombres", "Apellidos", "TipoDocumento", "Documento", "SalarioMensual"], req.body)
            const user = req.body;
            res.status(201).send(await UsersService.create(user));
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
            checkKeys(["TipoDocumento", "Documento"], req.body)
            const user = req.body;
            res.status(201).send(await UsersService.update(user));
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
            checkKeys(["TipoDocumento", "Documento"], req.body)
            const data = req.body;
            res.status(201).send(await UsersService.delete(data));
        } catch (error) {
            console.log(error.stack && error.stack || error);
            res.status(500).send({
                error: true,
                msg: error
            })
        }
    },

    search: async (req: Request, res: Response) => {
        try{
            checkKeys(["TipoDocumento", "Documento"], req.params);
            const data = req.params;
            res.status(200).send(await UsersService.search(data));

        } catch (error) {
            console.log(error.stack && error.stack || error);
            res.status(500).send({
                error: true,
                msg: error
            })
        }
    }
}

export default UsersController;