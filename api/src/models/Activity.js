const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "activity",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      difficulty: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: [
          "Principiante",
          "Aficionado",
          "Normal",
          "Profesional",
          "Experto",
        ],
      },
      duration: {
        //type: DataTypes.REAL(2, 2),
        type: DataTypes.REAL,
        allowNull: false,
      },
      // season: {
      //   type: DataTypes.ENUM,
      //   allowNull: false,
      //   values: ["Otoño", "Invierno", "Primavera", "Verano"],
      // },
    },
    { timestamps: false }
  );
};
