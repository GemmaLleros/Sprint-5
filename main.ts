// 1. Se define una interface llamada "JokeResponse" con la propiedad llamada "joke". Esta interface describe el formato de la respuesta.
interface JokeResponse {
    joke : string;
}
interface Joke {
    joke: string;
    score: number;
    date: string;
}
let reportJokes: Joke[] = [];

async function callRandomJoke() {   
    const API_URL = 'https://icanhazdadjoke.com/';
    const options: RequestInit = {headers: {'Accept': 'application/json'}};
    const jokeResponse = await (await fetch(API_URL, options)).json() as JokeResponse;
    console.log(jokeResponse);
    const scoreButton = document.getElementById("scoreButtons") as HTMLButtonElement;
    scoreButton.style.display = "";
    
// 2.4 Se obtiene un elemento HTML con el id "joke" y se le asigna el valor del chiste obtenido de la respuesta.
    const HTMLResponse = document.querySelector('#joke') as HTMLElement;
    HTMLResponse.innerHTML = jokeResponse.joke;
}

function getPoints(id: number) {
    const punctuation: number = id;
    const textDate: string = new Date().toISOString();
    const lastJokeElement = document.getElementById("joke");
    let textLastJoke = "";
    if (lastJokeElement) {
      textLastJoke = lastJokeElement.outerText;
    }
    const jokeIndex = reportJokes.findIndex((e: Joke) => textLastJoke === e.joke);
    const joke: Joke = { joke: textLastJoke, score: punctuation, date: textDate };
  
    if (textLastJoke !== "" && jokeIndex < 0) {
      reportJokes.push(joke);
    } else {
      reportJokes[jokeIndex].score = punctuation;
    }
    console.log(reportJokes);
  }