function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day}, ${hour}:${minutes}`;
}

function showCityInfo(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let cityName = document.querySelector("#city");
  cityName.innerHTML = `${cityInput.value}`;

  function showCurrentWeather(response) {
    tempCelsius = response.data.main.temp;
    let tempRound = Math.round(tempCelsius);
    let temperatureElement = document.querySelector("#tempvalue");
    temperatureElement.innerHTML = `${tempRound}`;

    let humidityRound = Math.round(response.data.main.humidity);
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = `Humidity: ${humidityRound}%`;
    let windRound = Math.round(response.data.wind.speed);
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = `Wind: ${windRound} km/h`;
    let dateElement = document.querySelector("#date");
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

    let conditionsElement = document.querySelector("#current-conditions");
    conditionsElement.innerHTML = `${response.data.weather[0].description}`;

    getForecast(response.data.coord);
  }

  let apiKey = "62d974cdf289555d8e3112425a1f6164";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentWeather);
}
let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", showCityInfo);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
            <div class="weather-forecast-day">${formatDay(forecastDay.dt)}</div>
            <img
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt="Light rain"
              id="icon"
              width="42px"
            />
            <span class="weather-forecast-temp-max">${Math.round(
              forecastDay.temp.max
            )}°</span
            ><span class="weather-forecast-temp-min">${Math.round(
              forecastDay.temp.min
            )}°</span>
          </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "a2dda52dce059eb8a14e95aaa0db6ab7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function showTempFahrenheit(event) {
  event.preventDefault();
  tempCelsiusLink.classList.remove("active");
  tempFahrenheitLink.classList.add("active");
  let tempFahrenheitvalue = Math.round(tempCelsius * 1.8 + 32);
  let temperatureElement = document.querySelector("#tempvalue");
  temperatureElement.innerHTML = tempFahrenheitvalue;
}
let tempFahrenheitLink = document.querySelector("#fahrenheit-main");
tempFahrenheitLink.addEventListener("click", showTempFahrenheit);

function showTempCelsius(event) {
  event.preventDefault();
  tempFahrenheitLink.classList.remove("active");
  tempCelsiusLink.classList.add("active");
  let temperatureElement = document.querySelector("#tempvalue");
  temperatureElement.innerHTML = Math.round(tempCelsius);
}
let tempCelsiusLink = document.querySelector("#celsius-main");
tempCelsiusLink.addEventListener("click", showTempCelsius);

let tempCelsius = 17;
