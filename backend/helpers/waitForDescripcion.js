const { Page } = require('puppeteer');
const { log } = require('../logger');
const path = require('path');

const archivos=[
    path.join(__dirname, '..', 'assets', 'imagen1.jpg'),
    path.join(__dirname, '..', 'assets', 'imagen2.jpg'),
    path.join(__dirname, '..', 'assets', 'imagen3.jpg'),
];

/**
 * @param {Page} pagina 
 */
async function waitForDescripcion(pagina, descripcion){
    await pagina.waitForSelector('.loading-area');
    await pagina.waitForSelector('.loading-area', {hidden: true});
    
    log.info('llenado descripcion...');
    await pagina.waitForSelector('#input_text_area_review');
    await pagina.type('#input_text_area_review', descripcion);

    await pagina.waitForSelector('#Uploader:not(.disable):not([disabled])');

    log.info('Abriendo selector de archivos');
    // subir imagenes
    const [chooser] = await Promise.all([
        pagina.waitForFileChooser(),
        pagina.click('#Uploader')
    ]);

    log.info('Subiendo archivos...');
    await chooser.accept(archivos);

    log.info('Esperando lista de transicion rchivos...');

    // esperar a que se suban las imagenes
    await pagina.waitForSelector('.uploading-list:not(:empty)');
    await pagina.waitForSelector('.uploading-list:empty');
    
    log.info('Imagenes subidas');
    log.info('Se ha llenado la seccion');
}

module.exports = waitForDescripcion;