const { Country } = require("../../src/db.js");

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
  name: "Argentina",
  imgflag: "https://mainfacts.com/media/images/coats_of_arms/ar.svg",
  continent: "Americas",
  capital: "Buenos Aires",
  subregion: "South America",
  area: 123,
  population: 456,
};

const country2 = {
  id: "ARG",
  imgflag: "https://mainfacts.com/media/images/coats_of_arms/ar.svg",
  continent: "Americas",
  capital: "Buenos Aires",
  subregion: "South America",
  area: "aaa",
  population: 456,
};

const country3 = {
  id: "ARG",
  name: "Argentina",
  continent: "Americas",
  capital: "Buenos Aires",
  subregion: "South America",
  area: "aaa",
  population: 456,
};

const country4 = {
  id: "AAA",
  name: "Argentina",
  imgflag: "https://mainfacts.com/media/images/coats_of_arms/ar.svg",
  capital: "Buenos Aires",
  subregion: "South America",
  area: "aaa",
  population: 456,
};

const country5 = {
  id: "AAA",
  name: "Argentina",
  imgflag: "https://mainfacts.com/media/images/coats_of_arms/ar.svg",
  continent: "Americas",
  subregion: "South America",
  area: "aaa",
  population: 456,
};

describe("Country Testing", () => {
  afterAll(async  ()=> {
    await db.sync({ force: true });
    db.close();
  });
  describe(" model",  ()=> {
    beforeEach(async function () {
      await Country.sync({ force: true });
    });
    describe("Country",  ()=> {
      it("Deberia cargarse en la DB",  (done)=> {
        Country.create(country)
          .then(() => done())
          .catch(() => done(new Error("No cargo en la DB")));
      });
      it("Error no deberia haberse cargado por no tener ID",  (done)=> {
        Country.create(country1)
          .then(() => done(new Error("No debería haberse creado")))
          .catch(() => done());
      });
      it("Error no deberia haberse cargado por no tener nombre en los Datos",  (done)=> {
        Country.create(country2)
          .then(() => done(new Error("No debería haberse creado")))
          .catch(() => done());
      });
      it("Error no deberia haberse cargado por no tener nombre en la URL de la imagen",  (done)=> {
        Country.create(country3)
          .then(() => done(new Error("No debería haberse creado")))
          .catch(() => done());
      });
      it("Error no deberia haberse cargado por no tener conmtinente",  (done)=> {
        Country.create(country4)
          .then(() => done(new Error("No debería haberse creado")))
          .catch(() => done());
      });
      it("Error no deberia haberse cargado por no tener capital",  (done)=> {
        Country.create(country5)
          .then(() => done(new Error("No debería haberse creado")))
          .catch(() => done());
      });
    });
  });
});
