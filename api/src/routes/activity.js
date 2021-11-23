"use strict";
const express = require("express");
const router = express.Router();

const fetch = require("node-fetch");

const { Country, Activity } = require("../db.js");

router.use(express.json());

router.post("/", async (req, res) => {
  let { name, difficulty, duration, season, countries } = req.body;

  let [activity, created] = await Activity.findOrCreate({
    where: { name: name },
    defaults: {
      difficulty: difficulty,
      duration: duration,
      season: season,
    },
  });

  let paises = await Country.findAll({ where: { id: countries } });

  for (let value of paises) {
    await value.addActivity(activity.dataValues.id);
  }

  res.send(activity);
});

module.exports = router;
