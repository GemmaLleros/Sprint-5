// 1. Se define una interface llamada "JokeResponse" con la propiedad llamada "joke". Esta interface describe el formato de la respuesta.
interface JokeResponse {
    joke: string;
}
// 2. Se define una función asíncrona que llama a una API de chistes para obtener un chiste aleatorio y mostrarlo en la página web.
async function callRandomJoke() {
// 2.1 Se establece la URL de la API.    
    const API_URL = 'https://icanhazdadjoke.com/';
// 2.2 Se definen las opciones para la petición a la API, incluyendo header para indicar que se espera una respuesta en formato JSON.
    const options: RequestInit = {
        headers: {
            'Accept': 'application/json'
        }
    };
// 2.3 Se hace una petición a la API y se espera la respuesta. La respuesta se trata como un objeto de tipo JokeResponse.
    const jokeResponse = await (await fetch(API_URL, options)).json() as JokeResponse;
    console.log(jokeResponse);
// 2.4 Se obtiene un elemento HTML con el id "joke" y se le asigna el valor del chiste obtenido de la respuesta.
    const HTMLResponse = document.querySelector('#joke') as HTMLElement;

    HTMLResponse.innerHTML = jokeResponse.joke;
}
/*
    3. Se agrega un event listener para el evento "DOMContentLoaded", que se ejecutará cuando el contenido del documento
    haya sido cargado y parseado. Al dispararse este evento, se llama a la función "callRandomJoke".
*/
document.addEventListener("DOMContentLoaded", (event) => {
    callRandomJoke();
});
