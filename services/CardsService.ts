import { User } from "../models/User";
import { Card } from "../models/Card";

const CardsService = {

    getAll: async () => {
        console.log("Pidiendo los datos")
        return await Card.find({});
    },

    create: async (data: any) => {
        console.log("Registrando datos")

        const users = await User.find({TipoDocumento: data.TipoDocumento, Documento: data.Documento})
        

        if (users[0] != undefined){
            data.Numero = Math.round(Math.random()*10000)
            const card = new Card(data);
            card.save();
            return card;
        }
        else {
            const message = {
                status: 0,
                message: "La tarjeta no puede ser solicitada, al usuario no estar inscrito"
            }
            return message;
        }
    },

    update: async (data: any) =>{
        console.log("Actualizando datos");
        const id = data.id;
        delete data.id;
        return await Card.where({_id: id}).update(data);
    },

    delete: async (id: string) =>{
        console.log("Borrando datos");
        return await Card.deleteOne({ _id: id });
    }
}

export default CardsService;