const { Request, Response } = require('express');
const { Page } = require('puppeteer');
const { log } = require('../logger');
const anuncioService = require('../service/anuncio.service');

const path=require('path');

function validarPrecio(precio){
    return /^\d+$/.test(precio);
}

function validarDescripcion(descripcion){
    return descripcion?.length > 0;
}

/**
 * Devuelve un manejador para la ruta de creacion de anuncio, valida precio y descripcion y devuelve la imagen del screeenshot como respuesta
 * @param {Page} pagina 
 * @returns {Function<Promise<void>, Request, Response>}
 */
function crearAnuncio(pagina){
    /**
     * @param {Request} req
     * @param {Response} res
    */
    return async function(req, res){
        const precio = req.body.precio;
        const descripcion = req.body.descripcion;
    
        if(!validarPrecio(precio)){
            return res
                .status(400)
                .json({
                    message: 'Bad Request', 
                    error: 'Precio invalido'
                });
        }
        if(!validarDescripcion(descripcion))
            return res
                .status(400)
                .json({
                    message: 'Bad Request',
                    error: 'Descripcion invalida'
                });
    
        try {
            const filename=await anuncioService.crearAnuncio(pagina, precio, descripcion);
            return res
                .status(200)
                .sendFile(path.join(__dirname, '..', 'public', filename));
        }
        catch(e){
            log.error(e.message);
            return res
                .status(500)
                .json({
                    message: 'Server Side Error', 
                    error: e.message
                });
        }
    };
}




module.exports = {crearAnuncio};
