const express=require('express');
const app=express();

const anuncioController = require('../controller/anuncio.controller');

app.post('/api/crear-anuncio', express.json(), anuncioController.crearAnuncio);

module.exports = app;