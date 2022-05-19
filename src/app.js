const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const port = process.env.PORT || 3000;

const app = express();

// Defice paths for express config
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup Handle Bars and views Location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory
app.use(express.static(publicDirectory));

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Name",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    name: "this is the help page",
    title: "Help Page",
    name: "Andrew Mead",
  });
});

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Abdulbasit",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please Enter a Addresss",
    });
  }
  forecast(req.query.address, (error, data, icon) => {
    if (error) {
      return res.send({
        error,
      });
    }
    res.send({
      forecast: data,
      location: req.query.address,
      icon,
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help Article Not Found",
    description: "Sorry no Help Article found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 page",
    description: "Try looking for another page",
  });
});

app.listen(port, () => {
  console.log("Server listening on port 3000" + port);
});
