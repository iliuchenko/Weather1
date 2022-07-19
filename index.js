// Date
let currentDate = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentDate.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[currentDate.getMonth()];

let year = currentDate.getFullYear();
let date = currentDate.getDate();

let hours = currentDate.getHours();
if (hours < 10) {
  hours = 0`${hours}`;
}

let minutes = currentDate.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let formattedDay = document.querySelector(".day");
formattedDay.innerHTML = `${day}`;

let formattedDate = document.querySelector(".date");
formattedDate.innerHTML = `${date} ${month} ${year}`;

let formattedTime = document.querySelector(".time");
formattedTime.innerHTML = `${hours} : ${minutes}`;

// Search the city and weather
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return  days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index <= 6 & index !== 0) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" class="icon-forecast" />
        <div class="weather-forecast-temp"> 
          <span>${Math.round(forecastDay.temp.max)}</span> 
          <span class="celsius">&#176;C</span>
          <br />
          <span class="forecast-temperature-min">${Math.round(forecastDay.temp.min)}</span>  
          <span class="celsius">&#176;C</span>
        </div>
      </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "35b76b262ed865a4a88cd579a156ed0d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&&appid=${apiKey}&units=metric`;
  
  axios.get(apiUrl).then(displayForecast);
}

function searchWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#currentDayCelsius").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#current-pressure").innerHTML =
    response.data.main.pressure;
  document.querySelector("#current-humidity").innerHTML =
    response.data.main.humidity;
  document.querySelector("#current-wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(".weather-description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#max-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#min-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);

    getForecast(response.data.coord);
}

function search(city) {
  let units = "metric";
  let apiKey = "35b76b262ed865a4a88cd579a156ed0d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

  axios.get(`${apiUrl}&${apiKey}`).then(searchWeather);
}

function submit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  search(city);
}

let searchCity = document.querySelector("form");
searchCity.addEventListener("submit", submit);

function searchFirstCity() {
  search("London");
}

let firstCity = document.querySelector(".first-city");
firstCity.addEventListener("click", searchFirstCity);

function searchSecondCity() {
  search("New York");
}

let secondCity = document.querySelector(".second-city");
secondCity.addEventListener("click", searchSecondCity);

function searchThirdCity() {
  search("Tokyo");
}

let thirdCity = document.querySelector(".third-city");
thirdCity.addEventListener("click", searchThirdCity);

function searchFourthCity() {
  search("Kyiv");
}

let fourthCity = document.querySelector(".fourth-city");
fourthCity.addEventListener("click", searchFourthCity);

search("London");

// Show current location
function showCurrentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "35b76b262ed865a4a88cd579a156ed0d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;

  axios.get(`${apiUrl}&${apiKey}`).then(searchWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

let buttonCurrentPosition = document.querySelector("#search-current-location");
buttonCurrentPosition.addEventListener("click", getCurrentPosition);

// Convert the temperature
// (12 °C × 9/5) + 32 = 53,6 °F
function convertToCelsius(temp) {
  return Math.round((5 / 9) * (temp - 32));
}

function convertToFahrenheit(temp) {
  return Math.round((temp * 9) / 5 + 32);
}

let isCelsius = true;

function convertCelsius() {
  if (isCelsius) {
    return;
  }

  let currentDayCelsius = document.querySelector("#currentDayCelsius");
  let temp = Number(currentDayCelsius.innerHTML);
  currentDayCelsius.innerHTML = convertToCelsius(temp);
  isCelsius = true;
}

function convertFahrenheit() {
  if (!isCelsius) {
    return;
  }

  let currentDayCelsius = document.querySelector("#currentDayCelsius");
  let temp = Number(currentDayCelsius.innerHTML);
  currentDayCelsius.innerHTML = convertToFahrenheit(temp);
  isCelsius = false;
}

let celsius = document.querySelector(".celsius");
celsius.addEventListener("click", convertCelsius);

let fahrenheit = document.querySelector(".fahrenheit");
fahrenheit.addEventListener("click", convertFahrenheit);
