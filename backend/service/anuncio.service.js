const { Page } = require('puppeteer');
const { randomUUID } = require('crypto');
const { log } = require('../logger');
const waitForInformacion = require('../helpers/waitForInformacion');
const waitForDescripcion = require('../helpers/waitForDescripcion');
const waitForTimeout = require('../helpers/waitForTimeout');
const waitForLogin = require('../helpers/waitForLogin');

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
    await waitForLogin(pagina);

    const botonVendeTuVehiculo = await pagina.waitForSelector('#primaryNav .btn-primary');
    await Promise.all([
        pagina.waitForNavigation(),
        botonVendeTuVehiculo.click()
    ]);

    await waitForInformacion(pagina, precio);
    log.info('Se ha llenado la informacion de venta y del vehiculo');

    // Siguiente seccion
    await Promise.all([
        pagina.waitForNavigation(),
        pagina.click('.next-button')
    ]);

    await waitForDescripcion(pagina, descripcion);
    log.info('Se ha llenado la descripcion y las imagenes');
   
    const vehiculoId = pagina.url().split('/').pop().trim();

    const botonSiguiente = await pagina.waitForSelector('.next-button:not(.back):not(.disabled)');
    // subir el anuncio
    await Promise.all([
        pagina.waitForNavigation(),
        botonSiguiente.click()
    ]);
    log.info(`Anuncio Creado!`);

    await waitForTimeout(5000);

    // redirigir a anuncio
    const liga = `${paginaURL}/myvehicle/${vehiculoId}`;
    await pagina.goto(liga);
    
    try {
        // Esperar a que la pagina hidrate con error 404
        await pagina.waitForSelector('.error-404', {timeout: 1000});
        // Decir al usuario que la peticion esta en proceso en seminuevos.com y que solo use la liga del anuncio en vez
        return { pendiente: true, ruta: '', liga}
        
    } catch {
        // En caso de no entrar a un error 404 asumimos que el anuncio se publico
        // Esperar a que los datos carguen esperando a que desaparezca el elemento de carga
        await pagina.waitForSelector('.loading-data', {hidden: true});

        // tomar screenshot
        const ruta =  `${vehiculoId}.png`;
        const rutaRelativa = `./public/${ruta}`;
        await pagina.screenshot({path: rutaRelativa});

        return { pendiente: false, ruta, liga};
    }
}

module.exports = {crearAnuncio};
