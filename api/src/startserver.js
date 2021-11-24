const { Season } = require("./db.js");

module.exports = {startServer: async ()=>{
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
}}