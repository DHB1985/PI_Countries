const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("activity", {
    // id: {
    //   type: DataTypes.STRING,
    //   //primaryKey: true,
    //   allowNull: false,
    //   unique: true,
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.STRING,
      allowNull: false,
      values: ["Principiante", "Aficionado", "Normal", "Profesional", "Experto"],
    },
    duration: {
      type: DataTypes.REAL(2, 2),
      allowNull: false,
    },
    season: {
      type: DataTypes.STRING,
      allowNull: false,
      values: ["Otoño", "Invierno", "Primavera", "Verano"],
    },
  });
};
