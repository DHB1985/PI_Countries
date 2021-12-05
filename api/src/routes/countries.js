"use strict";
const express = require("express");
const router = express.Router();

const sequelize = require("sequelize");
const { Op } = require("sequelize");

const { Country, Season, Activity } = require("../db.js");

router.use(express.json());

router.get("/", async (req, res) => {
  try {
    let { name } = req.query;
    if (name === "" || name === undefined) {
      let data = await Country.findAll({
        include: [{ model: Activity }],
      });
      res.json(data);
    } else if (name) {
      const country = await Country.findAll({
        where: sequelize.where(
          sequelize.fn("unaccent", sequelize.col("country.name")),
          {
            [Op.iLike]:
              name
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase() + "%",
          }
        ),
        include: [{ model: Activity }],
      });

      if (country.length !== 0) {
        res.json(country);
      } else {
        res.json("País no encontrado");
      }
    }
  } catch (e) {
    console.log("/routes/countries.js get / error: ", e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;

    const pais = await Country.findByPk(id.toUpperCase(), {
      include: [{ model: Activity, include: [{ model: Season }] }],
    });
    if (pais !== null) {
      res.json(pais);
    } else {
      res.json("País no encontrado");
    }
  } catch (e) {
    console.log("/routes/countries.js get /:id error: ", e);
  }
});

module.exports = router;
