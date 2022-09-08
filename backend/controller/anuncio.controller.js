const { Request, Response} = require('express');
const anuncioService = require('../service/anuncio.service');

const path=require('path');

function validarPrecio(precio){
    return /^\d+$/.test(precio);
}

function validarDescripcion(descripcion){
    return descripcion?.length > 0;
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function crearAnuncio(req, res){
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
        const filename=await anuncioService.crearAnuncio(precio, descripcion);
        return res
            .status(200)
            .sendFile(path.join(__dirname, '..', 'screenshots', filename));
    }
    catch(e){
        return res
            .status(500)
            .json({
                message: 'Server Side Error', 
                error: e.message
            });
    }
}

module.exports = {crearAnuncio};
