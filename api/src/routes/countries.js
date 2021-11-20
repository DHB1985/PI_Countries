"use strict";
const express = require("express");
const router = express.Router();

const { Op } = require("sequelize");

const fetch = require("node-fetch");

const { Country, countryactivity, Activity } = require("../db.js");

router.use(express.json());

router.get("/", async (req, res) => {
  let data = [];
  let responsePromise;
  let { name } = req.query;

  if (name === undefined) {
    responsePromise = await fetch("https://restcountries.com/v3/all").then(
      async (response) => {
        return response.json();
      },
      (e) => {
        console.log(e);
      }
    );

    data = responsePromise.map((element) => {
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
        name: element.translations.spa.common,
        imgflag: element.flags[1],
        continent: element.region,
        capital: capit,
        subregion: element.subregion,
        area: element.area,
        population: element.population,
      };
    });

    for (let element of data) {
      let [countrysearch, created] = await Country.findOrCreate({
        where: { id: element.id },
        defaults: {
          id: element.id,
          name: element.name,
          imgflag: element.imgflag,
          continent: element.continent,
          capital: element.capital,
          subregion: element.subregion,
          area: element.area,
          population: element.population,
        },
      });
    }
    res.json(data);
  } else if (name) {
    const country = await Country.findAll({
      where: { name: { [Op.startsWith]: name } },
    });

    if (country.length !== 0) {
      res.json(country);
    } else {
      res.json("País no encontrado");
    }
  }
});

router.get("/:id", async (req, res) => {
  let { id } = req.params;

  const pais = await Country.findByPk(id, { include: Activity });
  if (pais !== null) {
    res.json(pais);
  } else {
    res.status(400).send("Page not Found");
  }
});

module.exports = router;
