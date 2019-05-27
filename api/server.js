const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const requireDir = require('require-dir');

// iniciando o app
const app = express();
app.use(express.json());
app.use(cors());

// iniciando o DB Mongo
try{
   mongoose.connect(
      'mongodb+srv://black:will311@home-jfxqp.gcp.mongodb.net/wpark?retryWrites=true',
      { useNewUrlParser: true }
   );
}catch(Error){
   console.log('Falha ao se conectar com o banco de dados. Verifique sua conexão com a internet e os dados de acesso!');
}

// Importando todos os models
 requireDir('./src/models');

 // Importando rotas
 app.use('/api', require('./src/routes'));

 // Iniciando Servidor
 try{
    app.listen(8085);
    console.log("Servidor Iniciado na porta 8085 ...");
    
 }catch(Error){
    console.log('Falha ao iniciar o servidor!');
 }
