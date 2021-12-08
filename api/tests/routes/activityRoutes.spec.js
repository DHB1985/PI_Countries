/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Country, Activity, Season, conn } = require("../../src/db.js");
const supertest = require("supertest-as-promised")(app);

const agent = session(app);
const country = {
  id: "ARG",
  name: "Argentina",
  imgflag: "https://mainfacts.com/media/images/coats_of_arms/ar.svg",
  continent: "Americas",
  capital: "Buenos Aires",
  subregion: "South America",
  area: 123,
  population: 456,
};
const country1 = {
  id: "ITA",
  name: "Italia",
  imgflag: "https://mainfacts.com/media/images/coats_of_arms/it.svg",
  continent: "Europe",
  capital: "Rome",
  subregion: "Southern Europe",
  area: 789,
  population: 333,
};

const activitySky = {
  name: "Sky",
  difficulty: "Normal",
  duration: 1.5,
  season: ["Otoño", "Invierno"],
  countries: ["ARG", "ITA"],
};

const activityTenis = {
  name: "Tenis",
  difficulty: "Principiante",
  duration: 1.5,
  season: ["Primavera", "Verano"],
  countries: ["ARG"],
};

describe("Activity routes", () => {
  let response;
  beforeAll(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(
    async () =>
      await Activity.sync({ force: true })
        .then(async () => {
          await Season.sync({ force: true });
        })
        .then(
          async () =>
            await Season.create({
              name: "Otoño",
            })
        )
        .then(
          async () =>
            await Season.create({
              name: "Invierno",
            })
        )
        .then(
          async () =>
            await Season.create({
              name: "Primavera",
            })
        )
        .then(
          async () =>
            await Season.create({
              name: "Verano",
            })
        )
        .then(async () => {
          await Country.sync({ force: true });
        })
        .then(async () => {
          await Country.create(country1);
        })
  );
  beforeEach(
    async () =>
      await Country.sync({ force: true })
        .then(async () => await Country.create(country))
        .then(async () => await Country.create(country1))
  );

  describe("POST /activity", () => {
    beforeAll(() =>
      conn.authenticate().catch((err) => {
        console.error("Unable to connect to the database:", err);
      })
    );

    it("POST agrega una actividad y la devuelve", () => {
      return supertest
        .post("/activity")
        .send(activitySky)
        .expect(200)
        .expect("Content-Type", /json/)
        .expect((res) => {
          console.log(res.body);
          expect(res.body.name).equal("Sky");
          expect(res.body.difficulty).equal("Normal");
          expect(res.body.duration).equal(1.5);
          expect(res.body.id).equal(1);
        });
    });
  });

  describe("GET Activity", () => {
    beforeAll(async () => await conn.sync({ force: true }));
    beforeEach(() =>
      supertest
        .post("/activity")
        .send(activityTenis)
        .expect(200)
        .expect("Content-Type", /json/)
        .expect((res) => {
          console.log("respuesta", res.body);
        })
    );
    it("GET requiere una actividad específica", () => {
      return supertest
        .get("/activity/Tenis")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect((res) => {
          console.log("primer test", res.body);
          expect(res.body.id).equal(1);
          expect(res.body.difficulty).equal("Principiante");
          expect(res.body.duration).equal(1.5);
          expect(res.body.name).equal("Tenis");
        });
    });
    it("GET Comprobacion de un pais completo", () => {
      return supertest
        .get("/countries/ARG")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect((res) => {
          expect(res.body.id).equal("ARG");
          expect(res.body.activities[0].id).equal(1);
          expect(res.body.activities[0].seasons[0].id).equal(3);
          expect(res.body.activities[0].seasons[1].id).equal(4);
        });
    });
  });
});
