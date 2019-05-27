const mongoose = require('mongoose');

const ConfiguracoesSchema = new mongoose.Schema({

    valor30:{
        type: Number,
        required: true,
    },
    valor60:{
        type: Number,
        required: true,
    },
    valorAdicional:{
        type: Number,
        required: true,
    }
});

mongoose.model('Configuracoes', ConfiguracoesSchema);