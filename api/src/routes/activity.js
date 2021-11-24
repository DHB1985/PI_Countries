"use strict";
const express = require("express");
const router = express.Router();


const { Country, Activity, Season } = require("../db.js");
//const Seasons = require("../models/Seasons.js");

router.use(express.json());

router.post("/", async (req, res) => {
  let { name, difficulty, duration, season, countries } = req.body;

  let [activity, created] = await Activity.findOrCreate({
    where: { name: name },
    defaults: {
      difficulty: difficulty,
      duration: duration,
    },
  });

  let paises = await Country.findAll({ where: { id: countries } });

  for (let value of paises) {
    await value.addActivity(activity.dataValues.id);
  }
  let seasons = await Season.findAll({where: {name: season}})

  for (let value of seasons){
    await value.addActivity(activity.dataValues.id);
  }

  res.send(activity);
});

router.get("/:name", async (req, res) => {
  let { name } = req.params;

  const activity = await Activity.findOne({where: { name: name }, include: Season} );
  if (activity !== null) {
    res.json(activity);
  } else {
    res.status(400).send("Page not Found");
  }
});

module.exports = router;
