const mongoose = require('mongoose');

const Configuracoes = mongoose.model('Configuracoes');

module.exports = {
    async get(req, res){
        
        const configuracoes = await Configuracoes.find();
        
        return res.json(configuracoes);
    },

    async atualiza(req, res){

        const configuracoes = await Configuracoes.findByIdAndUpdate({_id : req.params.id }, req.body, { new: true });

        return res.json(configuracoes);
    }
}