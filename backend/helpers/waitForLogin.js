const { Page } = require('puppeteer');
const { log } = require('../logger');

const loginUrl = 'https://www.seminuevos.com/login';
const correo='intellimotor-test@outlook.com';
const password='kc7bD_23Jdv?r#/';

/**
 * @param {Page} pagina 
 */
async function waitForLogin(pagina){
    log.info('ingresando a seminuevos.com...');

    await pagina.goto(loginUrl);

    try {
        // Esperar que la navegacion te lleve a la pagina de entrada
        await pagina.waitForNavigation({timeout: 1000});
        log.info('usuario ya ingresado a seminuevos.com');
    } catch (e) {
        await pagina.waitForSelector('#email_login');
        
        // ingresar
        await pagina.type('#email_login', correo);
        await pagina.type('#password_login', password);

        const botonSubmit = await pagina.waitForSelector('#sigin-form button[type="submit"]');
        await Promise.all([
            pagina.waitForNavigation(),
            botonSubmit.click()
        ]);

        log.info('se ha ingresado a seminuevos.com');
    }

}

module.exports = waitForLogin;