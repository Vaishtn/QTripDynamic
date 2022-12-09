import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log(cities);

  // Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
  console.log(cities)
}
console.log("From init()");
console.log(config);

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  // Method 1:
  // return fetch(config.backendEndpoint+"/cities").then((res)=>res.json()).catch((error)=>console.log("Error"));

  // Method 2:
  try {
    let cities = await fetch(config.backendEndpoint + "/cities");
    let data = cities.json();
    return data;
  } catch (e) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let container = document.getElementById("data");
  let card = document.createElement("div");
  card.className = "col-lg-3 col-6 mb-4";
  card.innerHTML = `<a href="pages/adventures/?city=${id}" id="${id}"><div class="tile">
                  <div class=tile-text text-center>
                  <h1>${city}</h1>
                  <p>${description}</p>
                  </div>
                  <img class="img-responsive" src="${image}"/>
                  </div></a>`;
  container.append(card);
}

export { init, fetchCities, addCityToDOM };
