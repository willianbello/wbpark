const mongoose = require('mongoose');

const Usuario = mongoose.model('Usuario');

module.exports = {

    async get(req, res){
        //let nome = crypto.subtle.digest('SHA-256', req.params.nome);
        //let senha = crypto.subtle.digest('SHA-256', req.params.senha);
        const usuario = await Usuario.find();

        return res.json(usuario);
    },
}