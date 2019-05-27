const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({

    id:{
        type: String,
        required: true,
    },
    senha:{
        type: String,
        required: true,
    }
});

mongoose.model('Usuario', UsuarioSchema);