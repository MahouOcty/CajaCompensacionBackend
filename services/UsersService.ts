import { User } from "../models/User";


const UsersService = {

    getAll: async () => {
        console.log("Pidiendo los datos")
        return await User.find({});
    },

    create: async (userdata: any) => {
        console.log("Registrando datos")

        const salario = userdata.SalarioMensual;
        const salarioMinimo = 908526;

        const users = await User.find({TipoDocumento: userdata.TipoDocumento, Documento: userdata.Documento});
        var existe = false;

        if (users[0] == undefined){
            if(salario < 2*salarioMinimo){
                userdata.Tipo = 'A'
            } else if (salario > 6*salarioMinimo){
                userdata.Tipo = 'C'
            } else {
                userdata.Tipo = 'B'
            }
    
            const user = new User(userdata);
            user.save();
            const msg = {
                status: 1,
                message: "El usuario se ha inscrito correctamente"
            }
            return  msg;
        } else {
            const msg = {
                status: 0,
                message: "Este usuario ya se encuentra inscrito en la base de datos"
            }
            return msg
        }
        
        
    },

    update: async (data: any) =>{
        console.log("Actualizando datos");
        const TipoDocumento = data.TipoDocumento;
        const Documento = data.Documento;
        delete data.id, data.Documento;
        const salario = data.SalarioMensual;
        const salarioMinimo = 908526;

        if(salario != undefined){
            if(salario < 2*salarioMinimo){
                data.Tipo = 'A'
            } else if (salario > 6*salarioMinimo){
                data.Tipo = 'C'
            } else {
                data.Tipo = 'B'
            }
        }

        return await User.where({TipoDocumento: TipoDocumento, Documento: Documento}).update(data);
    },

    delete: async (data: any) =>{
        console.log("Borrando datos");

        return await User.findOneAndDelete({ TipoDocumento: data.TipoDocumento,  Documento: data.Documento });
    },

    search: async (data: any) =>{
        console.log("Buscando datos");
        const users = await User.find({TipoDocumento: data.TipoDocumento, Documento: data.Documento});
        
        if(users[0] != undefined){
            const msg = {
                isRegistered: true,
                status: users[0].Tipo
            }
            return msg;
        }
        else{
            const msg = {
                isRegistered: false
            }
            return  msg;
        }
    }
}

export default UsersService;