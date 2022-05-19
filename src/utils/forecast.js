const request = require("request");

const forecast = (address, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${address}&appid=1b2b5444bf802bf4aec550977fe1cc92&units=metric`;

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("Unable to find Location", undefined);
    } else if (!body.weather) {
      callback("Sorry No Location Found, Try another Address", undefined);
    } else {
      callback(
        undefined,
        `${body.weather[0].description}, It is ${body?.main?.temp} in ${body?.name}. It feels like ${body?.main?.feels_like}.`,
        `${body.weather[0].icon}`,
        `${body.main.humidity}`
      );
    }
  });
};

module.exports = forecast;
