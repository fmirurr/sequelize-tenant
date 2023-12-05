const {Sequelize, DataTypes} = require("sequelize");

module.exports = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: "id",
  },
  nombre: {
    type: DataTypes.STRING,
    field: "nombre",
  },
  apellido: {
    type: DataTypes.STRING,
    field: "apellido",
  },
  rut: {
    type: DataTypes.STRING,
    field: "rut",
  },
  createdAt: {
    type: DataTypes.DATE,
    field: "createdAt"
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: "updatedAt"
  }
};
