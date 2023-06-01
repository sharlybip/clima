import './index.css';
import h from 'hyperscript';
import { searchCountry } from './utils/paises';
import { hour } from './utils/hour';


const APIKEY = '847ef7a84bf5057a94b0928a805e855d';
const baseUrl = 'https://api.openweathermap.org/';

const local = document.getElementById('local')
const appNode = document.getElementById('clima');
appNode.className = 'p-5 flex flex-wrap justify-center overflow-y-scroll overflow-y-hidden max-h-[28rem] bg-slate-200  border-t-2 border-blue-900';
const btnSearch = document.getElementById('search');
const btnDelete = document.getElementById('delete');
const inputCity = document.querySelector('input');

window.navigator.geolocation.getCurrentPosition(async (position) => {
  console.log(position);
  local.append(await cityLocal({lat: position.coords.latitude,long:position.coords.longitude}))
}, () => {
  setTimeout(() => {
    const noNet = h('p.text-blue-900','No network available 📶📡🛰️ or Location blocked  📌🗺️');
    local.append(noNet);
  },2000)
  
});


const cityLocal = async ({lat,long}) => {
  const api2 = `${baseUrl}data/2.5/weather?lat=${lat}&lon=${long}&appid=${APIKEY}&units=metric`;
  console.log(api2);
  const response = await fetch(api2); 
  if (response.status === 200 ) {
    const data = await response.json();
    console.log(data);
    const h2 = h('h2.text-white.w-fi.mr-2.mb-2.bg-blue-900.rounded-3xl.p-2', `${data.name}, ${searchCountry(data.sys.country)}`);
    console.log(data.name);
    const sunrise = h('p.text-xs.text-blue-900',`Sunrise: ${hour(data.sys.sunrise)} AM`);
    hour(data.sys.sunrise)
    const sunset = h('p.text-xs.text-white', `Sunset: ${hour(data.sys.sunset)} PM`);
    const sun = h('div.sun.rounded-3xl.w-fit.p-2',[sunrise,sunset]);
    const names = h('div.flex.flex-col.justify-center', [h2,sun])
    const temp = h('p.mx-auto.text-3xl.text-blue-900.text-center', `${Math.floor(data.main.temp)}°`);
    const maxmin = h('div.text-blue-900.text-xs.text-center', `Max: ${Math.floor(data.main.temp_max)}°   Min: ${Math.floor(data.main.temp_min)}°`);
    const feels = h('p.text-xs.text-blue-900', `Feels like ${data.main.feels_like}°C`);
    const humidity = h('p.text-xs.text-blue-900',`Humidity ${data.main.humidity}%`);
    const numbers = h('div.flex.flex-col.justify-center.items-center', [temp,maxmin,feels, humidity]);

    const cloudiness= h('p.text-blue-900.text-xs',`Cloudiness ${data.clouds.all}%`) 
    const description = h('p.text-blue-900.mx-auto.text-center', (data.weather[0].description));
    const img = h('img.mx-auto.bg-white.rounded-3xl', {
      src: `assets/images/${data.weather[0].icon}.png`,
      alt: "clima",
      width: '100',
    });
    const imaDesc = h('div',[img,cloudiness,description]);
    setTimeout(()=>{
      local.textContent = ""
      local.append(names,numbers,imaDesc)
    },2000)
    }
    return '';
  }
const cardContainer = async ({city,lat,long}) => {
  const api = `${baseUrl}data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`;
  const api2 = `${baseUrl}data/2.5/weather?lat=${lat}&lon=${long}&appid=${APIKEY}&units=metric`;
  console.log(api);
  console.log(api2);
  let response;
  if (!city) {
    response = await fetch(api2)

  }else {
    response = await fetch(api)

  }
  const card = h('div.border-solid.border-2.border-blue-600.bg-white.w-40.margin.h-80.rounded-xl.p-4');
  if (response.status === 200 ) {
    const data = await response.json();
    console.log(data);
    const h2 = h('h2.text-blue-900.w-fi.mx-auto.text-center',data.name);
    const span = h('span.text-blue-900.bg-yellow-300.p-1.rounded-3xl.text-xs.w-fit', data.sys.country);
    h2.append(span);
    const a =h('a',
    {
      href: `https://www.google.com/maps/@${data.coord.lat},${data.coord.lon},17z?entry=ttu`,
      target: '_blank'
      
    }, h2)
    const countryComplete = h('p.mx-auto.text-center.text-blue-900.text-sm[17px]',searchCountry(data.sys.country));
    const temp = h('p.mx-auto.text-3xl.text-blue-900.text-center',`${Math.floor(data.main.temp)}°`);
    const maxmin = h('div.text-blue-900.text-xs.text-center',`Max: ${Math.floor(data.main.temp_max)}°   Min: ${Math.floor(data.main.temp_min)}°`);
    const description = h('p.text-blue-900.mx-auto.text-center',  (data.weather[0].description));
    const img = h('img.mx-auto.bg-white.rounded-3xl', {
      src: `assets/images/${data.weather[0].icon}.png`,
      alt: "clima",
      width: '100',
    });
    card.append(a,countryComplete,temp,maxmin,img,description);
    
    appNode.append(card);

  } else {
    inputCity.placeholder = `City ${response.statusText}`;
    setTimeout(() => {
      inputCity.placeholder = 'Introduce a City';
    },800);
  }
  return card;
    
  
}
setTimeout(() => {
  appNode.textContent = "";
  cardContainer({city: 'México'})
  cardContainer({city: 'Hamilton'})
  cardContainer({city: 'Sidney'})
  cardContainer({city: 'New york'})
  cardContainer({city: 'Texcoco'})
  cardContainer({city: 'Teotihuacan'})
  cardContainer({city: 'tegucigalpa'})
},2000);


btnSearch.addEventListener('click', async (event) => {
  event.preventDefault();
  if (!inputCity.value) {
    inputCity.placeholder = 'Please Introduce a city';
    return;
  }
  try {
    await cardContainer({city: inputCity.value})
    appNode.scrollTo(0, appNode.scrollHeight);
    console.log(appNode.scrollHeight)
  } catch (error) {
    console.log(error);
  }
  inputCity.value = '';
} )
btnDelete.addEventListener('click', (event)=>{
  event.preventDefault();
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


