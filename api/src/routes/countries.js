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
  if (name === '' || name === undefined) {
    let data = await Country.findAll({
      include: [{ model: Activity }],
    });
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

  const pais = await Country.findByPk(id.toUpperCase(), {
    include: [{ model: Activity, include: [{ model: Season }] }],
  });
  if (pais !== null) {
    res.json(pais);
  } else {
    res.json('País no encontrado');
  }
});

module.exports = router;
