"use strict";
const express = require("express");
const router = express.Router();

const fetch = require("node-fetch");

const { Country, CountryActivity } = require("../db.js");

router.use(express.json());

router.get("/", async function (req, res) {
  fetch("https://restcountries.com/v3/all")
    .then((response) => response.json())
    .then((value) => {
      let data = [];

      //console.log(value[0]);

      data = value.map((element) => {
        let capit;

        if (!element.capital) {
          capit = "Capital no disponible";
        } else if (element.capital.length === 1) {
          capit = element.capital[0];
        } else if (element.capital.length > 1) {
          capit = element.capital.join(", ");
        }

        return {
          id: element.cca3,
          name: element.name.common,
          imgflag: element.flags[1],
          continent: element.region,
          capital: capit,
          subregion: element.subregion,
          area: element.area,
          population: element.population,
        };
      });
      data.forEach((element) => {
        Country.create({
          id: element.id,
          name: element.name,
          imgflag: element.imgflag,
          continent: element.continent,
          capital: element.capital,
          subregion: element.subregion,
          area: element.area,
          population: element.population,
        });
      });

      // data.forEach((element) => {
      //   const [instance, created] = await Country.findOrCreate({
      //     where: { id: element.id },
      //     defaults: {
      //       name: element.name,
      //       imgflag: element.imgflag,
      //       continent: element.continent,
      //       capital: element.capit,
      //       subregion: element.subregion,
      //       area: element.area,
      //       population: element.population,
      //     },
      //   });
      //});

      res.json(data);
    });
});

router.get("/:id", async function (req, res, next) {
  let {id} = req.params;
  console.log('id ',id)
  const pais = await Country.findByPk(id)
  const activities = await CountryActivity.findAll({where: {countryId: id}})
  console.log('activities ', activities)
  if (pais !== null){
    res.send(pais)
  } else {
    res.status(400).send("Page not Found")
  }
});

module.exports = router;
