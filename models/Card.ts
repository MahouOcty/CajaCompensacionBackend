import mongoose from 'mongoose';

const cardsSchema = new mongoose.Schema({
    TipoDocumento: {
        type: String,
        required: true
    },
    Documento: {
        type: Number,
        required: true
    },
    Numero: {
        type: Number,
        required: true
    },
    Saldo: {
        type: Number,
        required: true
    }
})

const Card = mongoose.model('Card', cardsSchema)

export {Card}