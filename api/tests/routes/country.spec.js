/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Country, Activity, conn } = require("../../src/db.js");

const agent = session(app);
const country = {
  name: "Argentina",
};

describe("Country routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Country.sync({ force: true }).then(() =>
      Country.create({
        id: "ARG",
        name: "Argentina",
        imgflag: "element.imgflag",
        continent: "Americas",
        capital: "Buenos Aires",
        subregion: "South America",
        area: 123,
        population: 456,
      })
    )
  );
  describe("GET /countries", () => {
    it("should get 200", () => agent.get("/countries").expect(200));
  });
});

describe("Activity routes", () => {
  let response 
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Activity.sync({ force: true }).then(() =>
      Activity.create({
        name: "Sky",
        difficulty: "Normal",
        duration: 1.5,
      })
    ).then(async (resp)=>{
    response = resp
     
    })
  );
  
  describe("POST /activity", () => {
    it("Name must be Sky", () => expect(response.name).equals('Sky'));
    it("Difficulty must be 'Normal'", () => expect(response.difficulty).equals('Normal'));
    it("Duration must be 1.5", () => expect(response.duration).equals( 1.5));
  });

});
