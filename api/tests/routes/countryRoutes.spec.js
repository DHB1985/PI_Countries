/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Country, conn } = require("../../src/db.js");

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

describe("Country routes", () => {
  beforeAll(() =>
    conn
      .authenticate()
      .then(() => console.log("conectado"))
      .catch((err) => {
        console.error("Unable to connect to the database:", err);
      })
  );
  beforeEach(
    async () =>
      await Country.sync({ force: true }).then(
        async () => await Country.create(country)
      ).then(
        async () => await Country.create(country1)
      )
  );
  describe("GET /countries", () => {
    it("should get 200", () => agent.get("/countries").expect(200));

    it("Busca todos los paises en la Db", () => {
        return agent
          .get("/countries")
          .expect(200)
          .expect("Content-Type", /json/)
          .expect((res) => {
           expect(res.body.length).equal(2);
          });
      });

    it("Responde con el nombre del Pais", () => {
      return agent
        .get("/countries/ARG")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect((res) => {
          expect(res.body.name).equal("Argentina");
        });
    });

    it("Responde con el nombre del Pais buscado por query", () => {
      return agent
        .get("/countries?name=Arg")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect((res) => {
          expect(res.body[0].name).equal("Argentina");
        });
    });
  });
});
