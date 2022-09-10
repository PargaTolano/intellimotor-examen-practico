const { Page } = require('puppeteer');
const { randomUUID } = require('crypto');
const { log } = require('../logger');
const waitForInformacion = require('../helpers/waitForInformacion');
const waitForDescripcion = require('../helpers/waitForDescripcion');
const waitForTimeout = require('../helpers/waitForTimeout');

// constantes
const paginaURL = 'https://www.seminuevos.com';

/**
 * Navega la pagina y crea el anuncio utilizando las funciones de interaccion de puppeteer
 * @param { Page }      pagina 
 * @param { Number }    precio 
 * @param { String }    descripcion 
 * @returns 
 */
async function crearAnuncio( pagina, precio, descripcion){

    log.info(`Crear Anuncio`);
    await pagina.goto(paginaURL);

    const botonVendeTuVehiculo = await pagina.waitForSelector('#primaryNav .btn-primary');
    await Promise.all([
        pagina.waitForNavigation(),
        botonVendeTuVehiculo.click()
    ]);

    log.info('Redirigido a creacion de anuncio');
    await waitForInformacion(pagina, precio);

    // Siguiente seccion
    await Promise.all([
        pagina.waitForNavigation(),
        pagina.click('.next-button')
    ]);

    await waitForDescripcion(pagina, descripcion);
    const vehiculoId = pagina.url().split('/').pop().trim();

    const botonSiguiente = await pagina.waitForSelector('.next-button:not(.back):not(.disabled)');
    log.info('Botton encontrado');

    // subir el anuncio
    await Promise.all([
        pagina.waitForNavigation(),
        botonSiguiente.click()
    ]);
    log.info(`Anuncio Creado!`);

    await waitForTimeout(5000);

    // redirigir a anuncio
    const anuncioURL = `${paginaURL}/myvehicle/${vehiculoId}`;
    await pagina.goto(anuncioURL);
    
    // esperar a que la pagina se hidrate
    await pagina.waitForSelector('.loading-data');
    await pagina.waitForSelector('.loading-data', {hidden: true});

    // tomar screenshot
    const name =  `${vehiculoId}.png`;
    const filePath = `./public/${name}`;
    await pagina.screenshot({path: filePath});

    return name;
}

module.exports = {crearAnuncio};
