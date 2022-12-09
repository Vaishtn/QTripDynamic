import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  // console.log(search)
  let urlParams = new URLSearchParams(search);
  // console.log(urlParams)
  let myParam = urlParams.get('adventure');
  console.log(myParam)
  return myParam
  // Place holder for functionality to work in the Stubs
  //return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let adventureDetail = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`)
    return await adventureDetail.json()
  } catch {
    // Place holder for functionality to work in the Stubs
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  console.log(adventure)
  let headingEle=document.getElementById("adventure-name");
  headingEle.innerHTML=`${adventure.name}`

  let contentEle=document.getElementById("adventure-subtitle");
  contentEle.innerHTML=`${adventure.subtitle}`

  let imgEle=document.getElementById("photo-gallery");
  // imgEle.innerHTML=`<img src=${adventure.images}>`
adventure.images.forEach(ele=>{
let imgDiv=document.createElement("div");

imgDiv.innerHTML=`<img src=${ele} class="activity-card-image">`
imgEle.append(imgDiv)
})
  let contentdiv=document.getElementById("adventure-content");
  contentdiv.innerHTML=`${adventure.content}`
//   let detailDiv = document.getElementById("photo-gallery");
//     let divEle = document.createElement("div");
//     divEle.className = "col-lg-3 col-6 mb-4";
//     divEle.innerHTML = `
//     <div class="card activity-card">
//       <div class="card-body w-100">
//           <div class="text-center d-md-flex flex-row justify-content-between align-items-center">
//               <h5 class="card-title">${adventure.name}</h5>
//               <p class="card-text">${adventure.subtitle}</p>
//           </div>
//           <div class="text-center d-md-flex flex-row justify-content-between align-items-center mt-1">
//             <img src=${} class="activity-card-image" alt=${ele.name} />
//             <p class="card-text">${ele.content} Hours</p>
//           </div>
//       </div>
//     </div>
// `
// let imgDetail=adventure.

//   detailDiv.append(divEle);


}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
document.getElementById("photo-gallery").innerHTML=`<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
<div class="carousel-indicators">
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
</div>
<div class="carousel-inner" id="carousel-inner">
  
</div>
<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Previous</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
  <span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Next</span>
</button>
</div>`
images.forEach((ele,index)=>{
  let imgDiv=document.createElement("div");
imgDiv.className=`carousel-item ${index===0?"active":""}`
imgDiv.innerHTML=`<img src=${ele} class="activity-card-image">`
document.getElementById("carousel-inner").append(imgDiv)
// imgEle.append(imgDiv)
})
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
if(adventure.available){
  document.getElementById("reservation-panel-available").style.display="block";
  document.getElementById("reservation-panel-sold-out").style.display="none";
  document.getElementById("reservation-person-cost").innerHTML=adventure.costPerHead;
}else{
  document.getElementById("reservation-panel-sold-out").style.display="block"
  document.getElementById("reservation-panel-available").style.display="none"
}
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
document.getElementById("reservation-cost").innerHTML=persons*adventure.costPerHead;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  document.getElementById("myForm").addEventListener("submit",async(event)=>{
    event.preventDefault()
    let inputs=document.getElementsByTagName("input");
    let formData={adventure:adventure.id};
    for(let i=0;i<inputs.length;i++){
      formData[inputs[i].name]=inputs[i].value;
    }
    console.log("formdata",formData)

    let response=await fetch(`${config.backendEndpoint}/reservations/new`,
    {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData),
    })
  
    alert(response.statusText)
  })
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
if(adventure.reserved){
  document.getElementById("reserved-banner").style.display="block";
}else{
  document.getElementById("reserved-banner").style.display="none";
}
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
