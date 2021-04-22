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

        if(salario < 2*salarioMinimo){
            userdata.Tipo = 'A'
        } else if (salario > 6*salarioMinimo){
            userdata.Tipo = 'C'
        } else {
            userdata.Tipo = 'B'
        }

        const user = new User(userdata);
        user.save();
        return await user;
    },

    update: async (data: any) =>{
        console.log("Actualizando datos");
        const id = data.id;
        delete data.id;
        return await User.where({_id: id}).update(data);
    },

    delete: async (id: string) =>{
        console.log("Borrando datos");
        return await User.deleteOne({ _id: id });
    },

    search: async (data: any) =>{
        console.log("Buscando datos");
        const users = await User.find({});
        var existe = false;
        var type = '';
        Object.keys(users).forEach(i => {
            const user = users[i]
            if(user.TipoDocumento == data.TipoDocumento && user.Documento == data.Documento){
                existe = true;
                type = user.Tipo;
            }
        });
        if(existe){
            const msg = {
                isRegistered: true,
                status: type
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