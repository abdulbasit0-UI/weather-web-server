const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const weatherLocation = document.querySelector(".weather-location");
const weatherForecast = document.querySelector(".weather-forecast");
const weatherIcon = document.querySelector(".weather-icon");
const weatherError = document.querySelector(".weather-error");
const weatherInfo = document.querySelector(".weather-info");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  fetch(`/weather?address=${location}`).then((responseData) => {
    responseData.json().then((weatherData) => {
      if (weatherData.error) {
        weatherError.innerHTML = weatherData.error;
        weatherLocation.innerHTML = "";
        weatherForecast.innerHTML = "";
        weatherIcon.innerHTML = "";
      } else {
        weatherLocation.innerHTML = weatherData.location;
        weatherForecast.innerHTML = weatherData.forecast;
        const iconurl =
          "http://openweathermap.org/img/w/" + weatherData.icon + ".png";

        weatherIcon.innerHTML = `<img src="${iconurl}" />`;
        weatherInfo.innerHTML = `<img width="50px" src="../images/humidity.png"> ${weatherData.humidity}% <p>Humidity</p>`;
        weatherError.innerHTML = "";
      }
    });
  });

  search.value = "";
});
