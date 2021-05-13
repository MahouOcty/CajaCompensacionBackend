import { User } from "../models/User";
import { Card } from "../models/Card";
import fetch from "node-fetch";
const CardsService = {

    getAll: async () => {
        console.log("Pidiendo los datos")
        return await Card.find({});
    },

    create: async (data: any) => {
        console.log("Registrando datos")

        const users = await User.find({TipoDocumento: data.TipoDocumento, Documento: data.Documento})
        
        if (users[0] != undefined){
            var Numero = 0;

            do{
                Numero = Math.round(Math.random()*10000)
            }while(Numero <= 1000);

            data.Numero = Numero;
            var Salario = users[0].SalarioMensual
            data.Saldo = Salario*(30/100);

            const card = new Card(data);
            
            await card.save();

            const CardData = {
                IdEntidad: "CAJA1BA4R8",
                TypeDocument: data.TipoDocumento,
                NDocument: data.Documento,
                CantidadUso: 0,
                TotalCupoTc: data.Saldo,
                CantidadDisponible: data.Saldo,
                Estado: "Al dia"
            }


            const JsonData = JSON.stringify(CardData);
            console.log(JsonData);

            //enviar tarjeta a central de riesgos
            fetch('http://4a7f18b749fb.ngrok.io/creditcards/Create', {
                method: 'POST',
                body: JsonData,
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                }
                
            })
            .then((res: any) => res.json())
            .then((result: any) => console.log('Respuesta de central de riesgos:', result))
            .catch((err: Error) =>{
                console.log('error', err)
            })
            const message = {
                status: 1,
                numero: data.Numero,
                saldo: data.Saldo
            }
            console.log(message);
            return message;
       
            
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