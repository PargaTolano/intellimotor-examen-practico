const express=require('express');
const { Page }=require('puppeteer');
const anuncioController = require('../controller/anuncio.controller');

/**
 * Rutea todos las rutas de la api rest de anuncio a la aplicacion de express que se provee en los parametros
 * @param { express.Express } app 
 * @param { Page } pagina 
 */
function anuncioRutas( app, pagina) {
    app.post('/api/crear-anuncio', express.json(), anuncioController.crearAnuncio(pagina));
}

module.exports = anuncioRutas;