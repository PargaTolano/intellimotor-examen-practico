const express=require('express');
const puppeteer = require('puppeteer');
const anuncioRutas = require('./routes/anuncio.route');
const app=express();

(async function inicializarAplicacion(){
    const navegador= await puppeteer.launch({headless: false});
    const pagina = await navegador.newPage();
    await pagina.setViewport({width: 1920, height: 1080});

    // utilizar rutas
    anuncioRutas(app, pagina);
    
    // montar aplicacion
    const port = process.env.PORT || 8081;
    app.listen(port, ()=>{
        console.log(`Aplicacion de backend montada en puerto ${port}`);
    });
})();
