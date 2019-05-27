const mongoose = require('mongoose');

const Carro = mongoose.model('Carro');

module.exports = {

    async get(req, res){
        const carros = await Carro.find().sort('estado');

        return res.json(carros);
    },

    async getById(req, res){
        const carro = await Carro.findById(req.params.id);

        return res.json(carro);
    },

    async create(req, res){
        
        const carro = await Carro.create(req.body);

        return res.json(carro);
    },

    async update(req, res){
        const carro = await Carro.findByIdAndUpdate({_id : req.params.id }, req.body, { new: true });

        return res.json(carro);
    },

    async delete(req, res){
        await Carro.findOneAndRemove(req.params.id);

        return res.send();
    }
}