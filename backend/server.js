const express=require('express');
const app=express();

// utilizar las rutas
app.use(require('./routes/anuncio.route'));

const port = process.env.PORT || 8081;
app.listen(port, ()=>{
    console.log(`Aplicacion de backend montada en puerto ${port}`);
});
