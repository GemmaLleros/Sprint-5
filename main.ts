// 1. Se define una interface llamada "JokeResponse" con la propiedad llamada "joke". Esta interface describe el formato de la respuesta.
interface JokeResponse {
  id: string;
  joke: string;
  status: number;
}
interface Joke {
  joke: string;
  score: number;
  date: string;
}

const reportJokes: Joke[] = [];
let jokeResponse: JokeResponse

async function callRandomJoke(): Promise<void> {   
    const API_URL = 'https://icanhazdadjoke.com/';
    const options: RequestInit = {headers: {'Accept': 'application/json'}};
    jokeResponse = await (await fetch(API_URL, options)).json();
   
    
    const scoreButton = document.getElementById("scoreButtons") as HTMLButtonElement;
    scoreButton.style.display = "block";
    
// 2.4 Se obtiene un elemento HTML con el id "joke" y se le asigna el valor del chiste obtenido de la respuesta.
    const HTMLResponse = document.querySelector('#joke') as HTMLElement;
    HTMLResponse.innerHTML = jokeResponse.joke;
}

function getPoints(id: number) {
  const isDifferentJoke: boolean = jokeResponse.joke !== reportJokes[reportJokes.length -1]?.joke
  console.log("🚀 ~ file: main.ts:32 ~ getPoints ~ isDifferentJoke", isDifferentJoke)
    if (isDifferentJoke) {
      const textDate: string = new Date().toISOString();
      const joke: Joke = { joke: jokeResponse.joke, score: id, date: textDate };
      reportJokes.push(joke);
    }
    console.log("🚀 ~ file: main.ts:38 ~ getPoints ~ reportJokes", reportJokes)
}