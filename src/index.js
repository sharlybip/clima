import './index.css';
import { kelvinToCelsius } from './utils/kelvin';
import { searchCountry } from './utils/paises';

const appNode = document.getElementById('clima');
appNode.className = 'p-5 flex flex-wrap overflow-y-scroll overflow-y-hidden max-h-[38rem] mt-5 pb-10';
const btnSearch = document.getElementById('search');
const btnDelete = document.getElementById('delete');
const inputCity = document.querySelector('input');
window.navigator.geolocation.getCurrentPosition(async (position) => {
  console.log(position);
  appNode.append(await cardContainer({lat: position.coords.latitude,long:position.coords.longitude}))
});
const cardContainer = async ({city,lat,long}) => {
  const APIKEY = '847ef7a84bf5057a94b0928a805e855d';
  const baseUrl = 'https://api.openweathermap.org/';
  const api = `${baseUrl}data/2.5/weather?q=${city}&appid=${APIKEY}`;
  const api2 = `${baseUrl}data/2.5/weather?lat=${lat}&lon=${long}&appid=${APIKEY}`;
  let response;
  if (!city) {
    response = await fetch(api2)

  }else {
    response = await fetch(api)

  }
  const card = document.createElement('div');
  card.className = 'border-solid border-2 border-blue-600 bg-blue-900 w-40 h-80 mx-auto rounded-xl mt-5 p-4 ';
  if (response.status === 200 ) {
    const data = await response.json();
    const h2 = document.createElement('h2');
    h2.className = 'text-white w-fit mx-auto text-center';
    h2.textContent = data.name
    const span = document.createElement('span');
    span.className = 'text-white bg-yellow-800 p-1 rounded-3xl text-xs w-fit';
    span.textContent = data.sys.country;
    
    h2.append(span);
    const countryComplete = document.createElement('p');
    countryComplete.className = 'mx-auto text-center text-white text-sm[17px]';
    countryComplete.textContent = searchCountry(data.sys.country);
    const temp = document.createElement('p');
    temp.className = 'mx-auto text-3xl text-white text-center'
    temp.textContent = `${kelvinToCelsius(data.main.temp)}°`;
    const maxmin =document.createElement('div');
    maxmin.className = 'text-white text-xs text-center'
    maxmin.textContent = `Max: ${kelvinToCelsius(data.main.temp_max)}°   Min: ${kelvinToCelsius(data.main.temp_min)}°`
    const description = document.createElement('p');
    description.className = 'text-white mx-auto text-center';
    description.textContent = (data.weather[0].description).toUpperCase();
    const img = document.createElement('img');
    img.className = 'mx-auto bg-gradient-to-b from-blue-900/[.2] to-white/[.3] rounded-3xl'
    img.src= `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    img.alt= "clima";
    card.append(h2,countryComplete,temp,maxmin,img,description);
    appNode.append(card);

  } else {
    inputCity.placeholder = `City ${response.statusText}`;
    setTimeout(() => {
      inputCity.placeholder = 'Introduce a City';
    },800);
  }
  return card;
    
  
}



btnSearch.addEventListener('click', async (event) => {
  event.preventDefault();
  if (!inputCity.value) {
    console.log('vacio');
    inputCity.placeholder = 'Please Introduce a city';
    return;
  }
  try {
    await cardContainer({city: inputCity.value})
    
  } catch (error) {
    console.log('nada');
  }
  inputCity.value = '';
} )
btnDelete.addEventListener('click', ()=>{
  appNode.innerText= ''
})
// const addCity = async() => {
//   let apiKey = 'be0f755b93290b4c100445d77533d291763a417c75524e95e07819ad';
//   const yourCity = await fetch('https://api.ipdata.co?api-key=' + apiKey);
//   const response = await yourCity.json();
//   const finalCity = await response.region;
//   console.group('Chavez pica aqui')
//   console.log(response);
//   console.groupEnd()
//   return finalCity;
// }
// const getcity = await addCity();

// appNode.append(await cardContainer(getcity));


