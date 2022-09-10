const AnuncioService = {
    crearAnuncio: async function(precio, descripcion){
        var headers = new Headers();
        headers.append("Content-Type", "application/json");

        const body = JSON.stringify({ precio, descripcion});

        var options = {
            method: 'POST',
            body,
            headers
        };

        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/crear-anuncio`, options);
        const blob = await res.blob();
        const imagenURL = URL.createObjectURL(blob);
        
        return imagenURL;
    },
};

export default AnuncioService;
