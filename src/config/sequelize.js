require("pg").defaults.parseInt8 = true;
const { Sequelize } = require("sequelize");

let name, user, pswd, host, logging, options;

user = process.env.DB_USER;
host = process.env.DB_HOST;
port = process.env.DB_PORT;
name = process.env.DB_DATABASE;
pswd = process.env.DB_PASSWORD;
logging = false;

module.exports = new Sequelize(name, user, pswd, {
  host: host,
  dialect: "postgres",
  logging: logging,
  dialectOptions: options,
  pool: {
    max: 20,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

// module.exports = {
//   commonDBConnection,
// };
