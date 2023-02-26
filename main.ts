interface Joke {
  joke: string;
  score: number;
  date: string;
}

const scoreButton = <HTMLButtonElement>document.getElementById("scoreButtons");
const JOKE_CARD = <HTMLElement>document.getElementById('joke');
const reportJokes: Joke[] = [];
const jokeResponse: Joke = { joke: "", score: 0, date: "" };

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const apiWeather= `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=26e4714b232ad047024b8f3db887092f&lang=ca&units=metric`;
      console.log(apiWeather);
    // Haciendo una solicitud a OpenWeatherMap API para obtener el tiempo
    fetch(apiWeather)
      .then(response => response.json())
      .then((dataResponse) => {
        const arrayWeather = dataResponse.weather;
        const tempCent = dataResponse.main.temp;
        const icon = (arrayWeather[0]).icon;
        const iconWeather = <HTMLImageElement>document.getElementById('iconWeather')
        iconWeather.src = `./images/icons-temp/${icon}.png`
        const weatherDescription = arrayWeather[0].description;
        console.log(dataResponse)
        console.log(weatherDescription)
        console.log(dataResponse.main.temp);
        console.log(arrayWeather);
        document.getElementById('weather')!.innerHTML = `Hoy hace: ${tempCent}\u00B0`;
      });
  })
}

function callRandomJoke(): void {

  let urlAPI: string;

  switch (Math.round(Math.random())) {
    case 1: {
      urlAPI = 'https://api.chucknorris.io/jokes/random';
      fetch(urlAPI)
        .then((respuesta) => respuesta.json())
        .then((contenidoJson) => {

          jokeResponse.joke = contenidoJson.value;

          JOKE_CARD.innerHTML = jokeResponse.joke;

          scoreButton.style.display = "block";
        })
      console.log(urlAPI)
      break;
    }
    default: {
      urlAPI = 'https://icanhazdadjoke.com/';
      const header = { headers: { Accept: "application/json" } };
      fetch(urlAPI, header)
        .then((respuesta) => respuesta.json())
        .then((contenidoJson) => {

          jokeResponse.joke = contenidoJson.joke;

          JOKE_CARD.innerHTML = jokeResponse.joke;

          scoreButton.style.display = "block";
        })
      console.log(urlAPI)
      break;
    }
  }
}


function punctuate(idHtml: number) {

  const isDifferentJoke: boolean = !reportJokes.some(e => e.joke === jokeResponse.joke);

  if (isDifferentJoke) {
   
    reportJokes.push({ joke: jokeResponse.joke, score: idHtml, date: new Date().toISOString() });
  }

  scoreButton.style.display = "none";

  console.log(reportJokes);
}

/*
Opción para cambiar puntuación:
function punctuate(idHtml: number) {

  let indice: number = -1;

  reportJokes.some((e, i) => { if (e.joke === jokeResponse.joke) indice = i; return false;})

  if (indice === -1) {

    reportJokes.push({ joke: jokeResponse.joke, score: idHtml, date: new Date().toISOString() });

  } else {

    reportJokes[indice].score = idHtml;
  }


  console.log(reportJokes)
}
*/