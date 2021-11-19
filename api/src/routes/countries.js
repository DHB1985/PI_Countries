"use strict";

const fetch = require("node-fetch");
const {Country} = require('../db.js')

let express = require("express");
let router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
  fetch("https://restcountries.com/v3/all")
    .then((response) => response.json())
    .then((value) => {
      let data = [];

      //console.log(value[0]);
      data = value.map((element) => {
        return {
          id: element.cca3,
          name: element.name.common,
          imgflag: element.flags[1],
          continent: element.region,
          capital: element.capital,
          subregion: element.subregion,
          area: element.area,
          population: element.population,
        };
      });
      data.forEach(element => {
        Country.create(element)
      });
      res.json(data[0]);
    });
});

module.exports = router;
