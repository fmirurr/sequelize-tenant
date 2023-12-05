const { DataTypes, INTEGER, NUMBER, Sequelize } = require("sequelize");
const db = require("../config/sequelize");
const sequelize = new Sequelize("postgres::memory:");

const Tenants = db.define("tenants", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: "id",
  },
  slug: {
    type: DataTypes.STRING,
    field: "slug",
  },
  db_name: {
    type: DataTypes.STRING,
    field: "db_name",
  },
  db_host: {
    type: DataTypes.STRING,
    field: "db_host",
  },
  db_username: {
    type: DataTypes.STRING,
    field: "db_username",
  },
  db_password: {
    type: DataTypes.STRING,
    field: "db_password",
  },
  db_port: {
    type: DataTypes.INTEGER,
    field: "db_port",
  },
  createdAt: {
    type: DataTypes.DATE,
    field: "created_at",
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: "updated_at",
  },
});

module.exports = Tenants;
