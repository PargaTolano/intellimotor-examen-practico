const AnuncioService = {
    crearAnuncio: async function(precio, descripcion){
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const body = JSON.stringify({ precio, descripcion});
        
        const options = {
            method: 'POST',
            body,
            headers
        };

        const res = await fetch(`${process.env.REACT_APP_API_URL}/crear-anuncio`, options);
        const data = await res.json();
        
        return data;
    },
};

export default AnuncioService;
