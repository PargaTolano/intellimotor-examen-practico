const express=require('express');
const puppeteer = require('puppeteer');
const anuncioRutas = require('./routes/anuncio.route');
const { log } = require('./logger');
const waitForLogin = require('./helpers/waitForLogin');
const cors = require('cors');

const app=express();

app.use(cors());
app.use(express.static('public'));

(async function inicializarAplicacion(){
    const navegador= await puppeteer.launch({headless: false});
    const pagina = await navegador.newPage();
    await pagina.setViewport({width: 1920, height: 1080});
    await waitForLogin(pagina);

    // utilizar rutas
    anuncioRutas(app, pagina);

    
    // montar aplicacion
    const port = process.env.PORT || 8081;
    app.listen(port, ()=>{
        log.info(`escuchando peticiones en puerto -> ${port}`);
    });
})();
