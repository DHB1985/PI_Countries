/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Country, Activity, conn } = require("../../src/db.js");

const agent = session(app);
const country = {
  id: "AAA",
  name: "PAIS",
  imgflag: "element.imgflag",
  continent: "Americas",
  capital: "Buenos Aires",
  subregion: "South America",
  area: 123,
  population: 456,
};

describe("Country routes", () => {
  before(() =>
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
      )
  );
  describe("GET /countries", () => {
    it("should get 200", () => agent.get("/countries").expect(200));
    
    it("Responde con el nombre del Pais",  () => {
      return agent.get("/countries/AAA")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect((res)=> {
          console.log(res.body)
         expect(res.body.name).equal("PAIS");
        });
    });
  });
});

// describe("Activity routes", () => {
//   let response;
//   before(() =>
//     conn.authenticate().catch((err) => {
//       console.error("Unable to connect to the database:", err);
//     })
//   );
//   beforeEach(() =>
//     Activity.sync({ force: true })
//       .then(() =>
//         Activity.create({
//           name: "Sky",
//           difficulty: "Normal",
//           duration: 1.5,
//         })
//       )
//       .then(async (resp) => {
//         response = resp;
//       })
//   );

//   describe("POST /activity", () => {
//     it("Name must be Sky", () => expect(response.name).equals("Sky"));
//     it("Difficulty must be 'Normal'", () =>
//       expect(response.difficulty).equals("Normal"));
//     it("Duration must be 1.5", () => expect(response.duration).equals(1.5));
//   });
// });
