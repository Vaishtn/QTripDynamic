
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  console.log(search)
  const urlParams = new URLSearchParams(search);
  console.log(urlParams)
  const myParam = urlParams.get('city');
  return myParam;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
  let jsonData=await fetch(`${config.backendEndpoint}/adventures?city=${city}`)
  
  return jsonData.json()
  }catch{
return null
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
let dataDiv=document.getElementById("data");
adventures?.forEach(ele=>{
  let divEle=document.createElement("div");
  divEle.className = "col-lg-3 col-6 mb-4";
  divEle.innerHTML=`
  <a href="detail/?adventure=${ele.id}" id=${ele.id}>
  <div class="card activity-card">
    <span class="category-banner">${ele.category}</span>
    <img src=${ele.image} class="card-img-top" alt=${ele.name} />
    <div class="card-body w-100">
    <div class="text-center d-md-flex flex-row justify-content-between align-items-center">
      <h5 class="card-title">${ele.name}</h5>
      <p class="card-text">$${ele.costPerHead}</p>
          </div>
          <div class="text-center d-md-flex flex-row justify-content-between align-items-center mt-1">
            <h5 class="card-title">Duration</h5>
            <p class="card-text">${ele.duration} Hours</p>
          </div>
          </div>
        </div>
      </a>
`
    dataDiv.append(divEle);

})
  // <div class="col-6 col-lg-3 mb-3">
  //   <a href="resort/">
  //     <div class="card adventure-card">
  //       <img src="../../assets/adventures/resort.jpg" class="card-img-top" alt="..." />
  //       <div class="card-body  text-center d-md-flex justify-content-between">
  //         <h5 class="card-title">Resort</h5>
  //         <p class="card-text">₹1200</p>
  //       </div>
  //     </div>
  //   </a>
  // </div>


}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
let filterDuration=list.filter(ele=>ele.duration>low && ele.duration<=high)
    console.log(filterDuration)
    console.log(filterDuration)
return filterDuration;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filterCategory=list.filter(ele=>
    categoryList.includes(ele.category));
    return filterCategory;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  let filteredList = [];

  // 3. Filter by duration and category together
  if (filters["duration"].length > 0 && filters["category"].length > 0) {
    let choice = filters["duration"].split("-");
    filteredList = filterByDuration(
      list,
      parseInt(choice[0]),
      parseInt(choice[1])
    );
    filteredList = filterByCategory(filteredList, filters["category"]);
  }

  // 2. Filter by duration only
  else if (filters["duration"].length > 0) {
    let choice = filters["duration"].split("-");
    filteredList = filterByDuration(
      list,
      parseInt(choice[0]),
      parseInt(choice[1])
    );
  }

  // 1. Filter by category only
  else if (filters["category"].length > 0) {
    filteredList = filterByCategory(list, filters["category"]);
  }

  // default case when there is no filter
  else {
    filteredList = list;
  }
  return filteredList;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem('filters',JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  let filters = localStorage.getItem('filters');
  // Place holder for functionality to work in the Stubs
  return JSON.parse(filters);
  
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let getSelectedPills = document.getElementById('category-list');
  filters?.category.map((val)=>{
    let spanEle = document.createElement('span');
    spanEle.classList.add('category-filter');
    spanEle.innerHTML = `
    ${val}
    `;
    getSelectedPills.append(spanEle);
  })
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
