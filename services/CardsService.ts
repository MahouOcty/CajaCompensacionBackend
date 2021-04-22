import { User } from "../models/User";
import { Card } from "../models/Card";

const CardsService = {

    getAll: async () => {
        console.log("Pidiendo los datos")
        return await Card.find({});
    },

    create: async (data: any) => {
        console.log("Registrando datos")

        const users = await User.find({})
        var existe = false;

        Object.keys(users).forEach(i => {
            const user = users[i]
            if(user.TipoDocumento == data.TipoDocumento && user.Documento == data.Documento){
                existe = true;
            }
        });
        if (existe){
            const carddata = {
                TipoDocumento: data.TipoDocumento,
                Documento: data.Documento,
                Numero: Math.round(Math.random()*10000)
            }
            const card = new Card(carddata);
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