"use strict";
const express = require("express");
const router = express.Router();

const fetch = require("node-fetch");

const { Country, CountryActivity } = require("../db.js");

router.use(express.json());