(()=>{"use strict";const t=t=>Math.floor(t-273.15),e=document.getElementById("clima");e.className="flex flex-wrap";const a=async a=>{const n=`https://api.openweathermap.org/data/2.5/weather?q=${a}&appid=847ef7a84bf5057a94b0928a805e855d&lang=sp`,o=await fetch(n),c=await o.json();console.log(c);const m=document.createElement("div");m.className="border-solid border-2 border-blue-600 bg-blue-200 w-40 h-64 mx-auto rounded-xl mt-10 p-4 ";const s=document.createElement("h2");s.className="text-white w-fit mx-auto",s.textContent=c.name;const l=document.createElement("span");l.className="text-white bg-yellow-800 p-1 rounded-3xl text-xs w-fit",l.textContent=c.sys.country,s.append(l);const i=document.createElement("p");i.className="mx-auto text-3xl text-white ",i.textContent=`${t(c.main.temp)}°`;const r=document.createElement("div");r.className="text-white text-xs",r.textContent=`Max: ${t(c.main.temp_max)}°   Min: ${t(c.main.temp_min)}°`;const p=document.createElement("p");p.className="text-white",p.textContent=c.weather[0].description;const d=document.createElement("img");d.className="mx-auto",d.src=await(`https://openweathermap.org/img/wn/${c.weather[0].icon}.png`),d.alt="clima",m.append(s,i,r,d,p),e.append(m)};a("washington"),a("chiautla"),a("chicago")})();