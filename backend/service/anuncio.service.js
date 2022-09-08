const puppeteer = require('puppeteer'); 
const path=require('path');
const { randomUUID } = require('crypto');

// constantes
const loginUrl = 'https://www.seminuevos.com/login';
const correo='parga.jose@outlook.com';
const password='EsSMXb9JTM@gCLg';
const recorrido='20000';
const wizardUrl = 'https://www.seminuevos.com/wizard?f_dealer_id=-1';
const numero='8114889772';
const archivos=[
    path.join(__dirname, '..', 'static', 'imagen1.jpg'),
    path.join(__dirname, '..', 'static', 'imagen2.jpg'),
    path.join(__dirname, '..', 'static', 'imagen3.jpg'),
];
const anuncioBaseUrl = 'https://www.seminuevos.com/myvehicle';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// asincrono para soporte de await
async function crearAnuncio(precio, descripcion){
    const navegador = await puppeteer.launch();
    const pagina = await navegador.newPage();
    await pagina.setViewport({width: 1920, height: 1080});
    await pagina.goto(loginUrl);

    await pagina.waitForSelector('#email_login');
    
    // ingresar
    await pagina.type('#email_login', correo);
    await pagina.type('#password_login', password);

    await Promise.all([
        pagina.waitForNavigation(),
        pagina.click('#sigin-form .input__submit')
    ]);
    
    await pagina.goto(wizardUrl);
    
    await sleep(4000);

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
    await sleep(1000);
    await pagina.click('[data-activates="dropdown_brands"]');
    await pagina.click('#dropdown_brands [data-content="acura"]>a');

    await pagina.click('[data-activates="dropdown_cities"]');
    await pagina.click('#dropdown_cities [data-content="monterrey"]>a');

    // Dependientes de tercero
    await sleep(1000);
    await pagina.click('[data-activates="dropdown_models"]');
    await pagina.click('#dropdown_models [data-content="ilx"]>a');

    // Dependientes de cuarto
    await sleep(1000);
    await pagina.click('[data-activates="dropdown_subtypes"]');
    await pagina.click('#dropdown_subtypes [data-content="sedan"]>a');

    // Siguiente seccion
    await Promise.all([
        pagina.waitForNavigation(),
        pagina.click('.next-button')
    ]);

    // llenar descripcion
    await pagina.waitForSelector('#input_text_area_review');
    await pagina.type('#input_text_area_review', descripcion);


    await pagina.waitForSelector('.loading-area');
    await pagina.waitForSelector('.loading-area', {hidden: true});
    // subir imagenes
    const [chooser] = await Promise.all([
        pagina.waitForFileChooser(),
        pagina.click('#Uploader')
    ]);
    await chooser.accept(archivos);

    const vehiculoId = pagina.url().split('/').pop();

    // subir el anuncio como 
    await Promise.all([
        pagina.waitForNavigation(),
        pagina.click('.next-button')
    ]);

    // redirigir a anuncio
    await pagina.goto(`${anuncioBaseUrl}/${vehiculoId}`);

    // Esperar a que aparezca y luego desaparezca el elemento de carga
    await pagina.waitForSelector('.loading-data');
    await pagina.waitForSelector('.loading-data', {hidden: true});

    // tomar screenshot
    const name =  `${randomUUID()}.png`;
    const filePath = `./screenshots/${name}`;
    await pagina.screenshot({path: filePath});

    await navegador.close();

    return name;
}

module.exports = {crearAnuncio};
