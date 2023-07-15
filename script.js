// console.log("hello");

// async function weatherdetails(){
//     const response=await fetch("https://api.openweathermap.org/data/2.5/weather?q={Goa}&appid={8bda7ca6f7a6b2e011ada402ed4934df}");
//     const data=await response.json();
//     console.log("weather data:->",data);  
//     let newpara= document.createElement('p');
//     newpara.textcontent=`${data?.main?.temp.toFixed(2)} °C`
//     document.body.appendChild(newpara);
// }

// console.log('Hello Jee babbar');

// const API_KEY = "8bda7ca6f7a6b2e011ada402ed4934df";

// function renderWeatherInfo(data) {
//         let newPara = document.createElement('p');
//         newPara.textContent = `${data?.main?.temp.toFixed(2)} °C`
    
//         document.body.appendChild(newPara);
// }

// async function fetchWeatherDetails() {

//     try {
//         let city = "goa";

//         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
//         const data = await response.json();
    
//         console.log("Weather data:-> " , data);

//         renderWeatherInfo(data);
//     }
//     catch(err) {
//         //handle the error here
//     }
//     //https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric

// }

// async function getCustomWeatherDetails() {
//     try{
//         let latitude = 17.6333;
//         let longitude = 18.3333;
    
//         let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?
//                                 lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
    
//         let data = await result.json();
    
//         console.log(data);
//     }
//     catch(err) {
//         console.log("Errror Found" , err);
//     }

// }


// function switchTab(clickedTab) {

//   apiErrorContainer.classList.remove("active");

//   if (clickedTab !== currentTab) {
//     currentTab.classList.remove("current-tab");
//     currentTab = clickedTab;
//     currentTab.classList.add("current-tab");

//     if (!searchForm.classList.contains("active")) {
//       userInfoContainer.classList.remove("active");
//       grantAccessContainer.classList.remove("active");
//       searchForm.classList.add("active");
//     } 
//     else {
//       searchForm.classList.remove("active");
//       userInfoContainer.classList.remove("active");
//       //getFromSessionStorage();
//     }

//     // console.log("Current Tab", currentTab);
//   }
// }

// function getLocation() {
//     if(navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showPosition);
//     }
//     else {
//         console.log("No geoLocation Support");
//     }
// }

// function showPosition(position) {
//     let lat = position.coords.latitude;
//     let longi = position.coords.longitude;

//     console.log(lat);
//     console.log(longi);
// }



//js code
const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");
const apiErrorMessage = document.querySelector("[data-apiErrorText]");
const apiErrorBtn = document.querySelector("[data-apiErrorBtn]");
const apiErrorImg = document.querySelector("[data-notFoundImg]");
const apiErrorContainer = document.querySelector(".api-error-container");
//initially vairables need????

let oldTab = userTab;
const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
oldTab.classList.add("current-tab");
getfromSessionStorage();

function switchTab(newTab) {
    apiErrorContainer.classList.remove("active");
    if(newTab != oldTab) {
        oldTab.classList.remove("current-tab");
        oldTab = newTab;
        oldTab.classList.add("current-tab");

        if(!searchForm.classList.contains("active")) {
            //kya search form wala container is invisible, if yes then make it visible
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
        else {
            //main pehle search wale tab pr tha, ab your weather tab visible karna h 
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            //ab main your weather tab me aagya hu, toh weather bhi display karna poadega, so let's check local storage first
            //for coordinates, if we haved saved them there.
            getfromSessionStorage();
        }
    }
}

userTab.addEventListener("click", () => {
    //pass clicked tab as input paramter
    switchTab(userTab);
});

searchTab.addEventListener("click", () => {
    //pass clicked tab as input paramter
    switchTab(searchTab);
});

//check if cordinates are already present in session storage
function getfromSessionStorage() {
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates) {
        //agar local coordinates nahi mile
        grantAccessContainer.classList.add("active");
    }
    else {
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }

}

async function fetchUserWeatherInfo(coordinates) {
    const {lat, lon} = coordinates;
    // make grantcontainer invisible
    grantAccessContainer.classList.remove("active");
    //make loader visible
    loadingScreen.classList.add("active");
    // apiErrorContainer.classList.remove("active");
    //API CALL
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
          );
        const  data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err) {
    // loadingScreen.classList.remove("active");
    loadingScreen.classList.remove("active");
    apiErrorContainer.classList.add("active");
    apiErrorImg.style.display = "none";
    apiErrorMessage.innerText = `Error: ${err?.message}`;
    apiErrorBtn.addEventListener("click", fetchUserWeatherInfo);
  }
    }



function renderWeatherInfo(weatherInfo) {
    //fistly, we have to fethc the elements 

    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    console.log(weatherInfo);

    //fetch values from weatherINfo object and put it UI elements
    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;


}

function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
    grantAccess.style.display = "none";
    messageText.innerText = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {

    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }

    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);

}

// function showError(err) {
//   switch (err.code) {
//     case err.PERMISSION_DENIED:
//       messageText.innerText = "You denied the request for Geolocation.";
//       break;
//     case err.POSITION_UNAVAILABLE:
//       messageText.innerText = "Location information is unavailable.";
//       break;
//     case err.TIMEOUT:
//       messageText.innerText = "The request to get user location timed out.";
//       break;
//     case err.UNKNOWN_ERROR:
//       messageText.innerText = "An unknown error occurred.";
//       break;
//   }
// }

const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click", getLocation);

const searchInput = document.querySelector("[data-searchInput]");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = searchInput.value;

    if(cityName === "")
        return;
    else 
        fetchSearchWeatherInfo(cityName);
})

async function fetchSearchWeatherInfo(city) {
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");
    apiErrorContainer.classList.remove("active");
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
          );
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err) {
    loadingScreen.classList.remove("active");
    apiErrorContainer.classList.add("active");
    apiErrorMessage.innerText = `${err?.message}`;
    apiErrorBtn.style.display = "none";
}
}
