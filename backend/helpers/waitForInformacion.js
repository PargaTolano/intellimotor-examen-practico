const { Page } = require("puppeteer");
const { log } = require('../logger');
const waitForTimeout = require("./waitForTimeout");

const recorrido='20000';
const numero='8114889772';

/**
 * Llena la informacion del vehiculo y informacion de venta
 * @param {Page}    pagina 
 * @param {Number}  precio 
 */
async function waitForInformacion(pagina, precio){
    await waitForTimeout(4000);

    // Cliquear dropboxes que no dependen de otras primero
    await pagina.click('[data-activates="dropdown_types"]');
    await pagina.click('#dropdown_types [data-content="autos"]>a');

    await pagina.click('[data-activates="dropdown_years"]');
    await pagina.click('#dropdown_years [data-content="2018"]>a');

    await pagina.click('[data-activates="dropdown_provinces"]');
    await pagina.click('#dropdown_provinces [data-content="nuevo leon"]>a');

    await pagina.click('[data-activates="dropdown_negotiable"]');
    await pagina.click(`#dropdown_negotiable [data-content="negociable"]>a`);
    await pagina.type('#input_precio', precio.toString());

    await pagina.click('[data-activates="dropdown_mileageType"]');
    await pagina.click('#dropdown_mileageType [data-content="kms."]>a');
    await pagina.type('#input_recorrido', recorrido);

    const inputTelefono = await pagina.$('#input_teléfono');
    if (inputTelefono){
        await inputTelefono.type(numero);
    }

    // Dependientes de primer nivel
    await waitForTimeout(1000);
    await pagina.click('[data-activates="dropdown_brands"]');
    await pagina.click('#dropdown_brands [data-content="acura"]>a');

    await pagina.click('[data-activates="dropdown_cities"]');
    await pagina.click('#dropdown_cities [data-content="monterrey"]>a');

    // Dependientes de tercero
    await waitForTimeout(1000);
    await pagina.click('[data-activates="dropdown_models"]');
    await pagina.click('#dropdown_models [data-content="ilx"]>a');

    // Dependientes de cuarto
    await waitForTimeout(1000);
    await pagina.click('[data-activates="dropdown_subtypes"]');
    await pagina.click('#dropdown_subtypes [data-content="sedan"]>a');
} 

module.exports = waitForInformacion;
