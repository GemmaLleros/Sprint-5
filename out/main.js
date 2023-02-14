"use strict";
const reportJokes = [];
let jokeResponse;
async function callRandomJoke() {
    const API_URL = 'https://icanhazdadjoke.com/';
    const options = { headers: { 'Accept': 'application/json' } };
    jokeResponse = await (await fetch(API_URL, options)).json();
    const scoreButton = document.getElementById("scoreButtons");
    scoreButton.style.display = "block";
    // 2.4 Se obtiene un elemento HTML con el id "joke" y se le asigna el valor del chiste obtenido de la respuesta.
    const HTMLResponse = document.querySelector('#joke');
    HTMLResponse.innerHTML = jokeResponse.joke;
}
function getPoints(id) {
    const isDifferentJoke = jokeResponse.joke !== reportJokes[reportJokes.length - 1]?.joke;
    console.log("🚀 ~ file: main.ts:32 ~ getPoints ~ isDifferentJoke", isDifferentJoke);
    if (isDifferentJoke) {
        const textDate = new Date().toISOString();
        const joke = { joke: jokeResponse.joke, score: id, date: textDate };
        reportJokes.push(joke);
    }
    console.log("🚀 ~ file: main.ts:38 ~ getPoints ~ reportJokes", reportJokes);
}
