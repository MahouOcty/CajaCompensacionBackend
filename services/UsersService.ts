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
    }
}

export default UsersService;