const express=require('express');
const app=express();


// utilizar las rutas

const port = process.env.PORT || 8081;
app.listen(port, ()=>{
    console.log(`Aplicacion de backend montada en puerto ${port}`);
});