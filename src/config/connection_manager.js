require("pg").defaults.parseInt8 = true;
const { Sequelize } = require("sequelize");

const { getNamespace } = require("continuation-local-storage");
const Tenants = require("../models/tenants");
const Users = require("../models/users");

let connectionMap;

/**
 *  Create knex instance for all the tenants defined in common database and store in a map.
 **/
const connectAllDb = async () => {
  let tenants;

  try {
    tenants = await Tenants.findAll();
  } catch (e) {
    console.log("error", e);
    return;
  }

  connectionMap = tenants
    .map((tenant) => {
      return {
        [tenant.slug]: createConnectionConfig(tenant),
      };
    })
    .reduce((prev, next) => {
      return Object.assign({}, prev, next);
    }, {});
};

/**
 *  Create configuration object for the given tenant.
 **/
function createConnectionConfig(tenant) {
  return new Sequelize(tenant.db_name, tenant.db_username, tenant.db_password, {
    host: tenant.db_host,
    dialect: "postgres",
    logging: false,
    database: [Users],
  });
}

/**
 * Get the connection information (knex instance) for the given tenant's slug.
 */
const getConnectionBySlug = async (slug) => {
  if (connectionMap) {
    console.log(`Getting connection for ${slug}`);

    return connectionMap[slug];
  }
};

/**
 * Get the connection information (knex instance) for current context. Here we have used a
 * getNamespace from 'continuation-local-storage'. This will let us get / set any
 * information and binds the information to current request context.
 */
const getConnection = async () => {
  const nameSpace =  getNamespace("unique context");
  const conn = await nameSpace.get("connection");

  if (!conn) {
    throw "Connection is not set for any tenant database.";
  }
  // conn.modelManager.addModel(Users)
  conn.define("users", Users)
  return conn;
};

module.exports = {
  connectAllDb,
  getConnectionBySlug,
  getConnection,
};
