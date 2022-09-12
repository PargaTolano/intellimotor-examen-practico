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

    await pagina.waitForSelector('#input_text_area_review');
    await pagina.type('#input_text_area_review', descripcion);

    await pagina.waitForSelector('#Uploader:not(.disable):not([disabled])');

    // subir imagenes
    const [chooser] = await Promise.all([
        pagina.waitForFileChooser(),
        pagina.click('#Uploader')
    ]);

    await chooser.accept(archivos);
}

module.exports = waitForDescripcion;