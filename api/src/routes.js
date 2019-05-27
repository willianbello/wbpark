const express = require('express');
const routes = express.Router();

const CarroController = require('./controllers/CarroController');
const UsuarioController = require('./controllers/UsuarioController');
const ConfiguracoesController = require('./controllers/ConfiguracoesController');

// Exibir todos veículos do BD
routes.get('/carros', CarroController.get);

// Exibir veículo por ID
routes.get('/carros/:id', CarroController.getById);

// Recupera Valores
routes.get('/valores', ConfiguracoesController.get);

// Atualiza Valores
routes.put('/valores/:id', ConfiguracoesController.atualiza);

// Adicionar veículo
routes.post('/carros', CarroController.create);

// Atualizar veículo
routes.put('/carros/:id', CarroController.update);

// Deletar veículo
routes.delete('/carros/:id', CarroController.delete);

module.exports = routes;