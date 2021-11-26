"use strict";
const express = require("express");
const router = express.Router();

const sequelize = require("sequelize");
const { Op } = require("sequelize");

const { Country, Season, Activity } = require("../db.js");

router.use(express.json());

router.get("/", async (req, res) => {
  let data = [];
  let responsePromise;
  let { name } = req.query;
  console.log('name ',name)
  if (name === '' || name === undefined) {
    let data = await Country.findAll({
      include: [{ model: Activity }],
    });
    console.log("data", data);
    res.json(data);
  } else if (name) {
    const country = await Country.findAll({
      where: {
        name: sequelize.where(
          sequelize.fn("LOWER", sequelize.col("name")),
          "LIKE",
          name.toLowerCase() + "%"
        ),
      },
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

  const pais = await Country.findByPk(id, {
    include: [{ model: Activity, include: [{ model: Season }] }],
  });
  if (pais !== null) {
    res.json(pais);
  } else {
    res.json('Pais no encontrado');
  }
});

module.exports = router;
