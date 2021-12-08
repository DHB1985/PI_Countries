const { Activity } = require("../../src/db.js");


describe("Model Testing", function () {
  afterAll(async function () {
    await db.sync({ force: true });
    db.close();
  });
  describe("Activity model", function () {
    beforeEach(async function () {
      await Activity.sync({ force: true });
    });
    describe("Activity", function () {
      it("error sin difficulty y sin duration", function (done) {
        Activity.create({
          name: "Sky",
          // difficulty: "Aficionado",
          // duration: 1.5
        })
          .then(() =>done(new Error ("No debería haberse creado")))
          .catch(() => done());
      });
      it("error sin name y sin duration", function (done) {
        Activity.create({
          //name: "Sky",
          difficulty: "Aficionado",
          // duration: 1.5
        })
          .then(() =>done(new Error ("No debería haberse creado")))
          .catch(() => done());
      });
      it("error sin name y sin difficulty", function (done) {
        Activity.create({
          //name: "Sky",
          // difficulty: "Aficionado",
          duration: 1.5,
        })
          .then(() =>done(new Error ("No debería haberse creado")))
          .catch(() => done());
      });
      it("error sin name y sin difficulty", function (done) {
        Activity.create({
          name: "Sky",
          difficulty: "Aficionado",
          duration: 1.5,
        })
          .then(() => done())
          .catch(() => done(new Error ("Error. Debería haberse creado")));
      });
    });
  });
});
