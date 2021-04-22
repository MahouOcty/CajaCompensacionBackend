import mongoose from 'mongoose';



const userSchema = new mongoose.Schema({
    Nombres: {
        type: String,
        required: true
    },
    Apellidos: {
        type: String,
        required: true
    },
    TipoDocumento: {
        type: String,
        required: true
    },
    Documento: {
        type: Number,
        required: true
    },
    SalarioMensual: {
        type: Number,
        required: true
    },
    Tipo: {
        type: String,
        required: false
    }
});




const User = mongoose.model('User', userSchema);


export { User }

