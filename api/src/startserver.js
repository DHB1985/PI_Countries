'use strict';
const axios =require  ("axios");
//const sequelize = require("sequelize");
const {Country, Season } = require("./db.js");

const chargeDBCountries = async () => {
  let responsePromise = await axios.get("https://restcountries.com/v3/all");

  console.log("start server", responsePromise.data[0]);

  let values = responsePromise.data.map((element) => {
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

  for (let element of values) {
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
};

module.exports = {
  startServer: async () => {
    await Season.create({
      name: "Otoño",
    });
    await Season.create({
      name: "Invierno",
    });
    await Season.create({
      name: "Primavera",
    });
    await Season.create({
      name: "Verano",
    });
    await chargeDBCountries();
  },
};
