const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const weatherLocation = document.querySelector(".weather-location");
const weatherForecast = document.querySelector(".weather-forecast");
const weatherIcon = document.querySelector(".weather-icon");
const weatherError = document.querySelector(".weather-error");
const weatherInfo = document.querySelector(".weather-info");
const weatherInfoBox = document.querySelector(".weather-info-box-1");
const weatherInfoBox2 = document.querySelector(".weather-info-box-2");
const weatherInfoBox3 = document.querySelector(".weather-info-box-3");

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
        weatherInfoBox.innerHTML = `<img width="50px" src="../images/humidity.png"> ${weatherData.humidity} %<p>Humidity</p>`;
        weatherInfoBox2.innerHTML = `<img width="50px" src="../images/atmospheric.png"> ${weatherData.pressure} mb<p>Pressure </p>`;
        weatherInfoBox3.innerHTML = `<img width="50px" src="../images/low-visibility.png"> ${weatherData.visibility}M<p>Visibility </p>`;
        weatherError.innerHTML = "";
      }
    });
  });

  search.value = "";
});
