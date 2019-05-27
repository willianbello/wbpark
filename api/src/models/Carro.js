const mongoose = require('mongoose');

const CarroSchema = new mongoose.Schema({

    placa:{
        type: String,
        required: true,
    },
    descricao:{
        type: String,
        required: true,
    },
    estado:{
        type: String,
        required: true,
        default:'ativo'
    },
    entrouData:{
        type: String,
        required: true,
    },
    entrouHora:{
        type: String,
        required: true,
    },
    saiuData:{
        type: String,
        default: "0"
    },
    saiuHora:{
        type: String,
        default: "0"
    },
    valor:{
        default:0
    },
});

mongoose.model('Carro', CarroSchema);