const Users = require("../models/users");
const {getConnection}  = require("../config/connection_manager");
const { models } = require("../config/sequelize");

const userService = {};

userService.getAll = async () => {
  const data = await getConnection()
  const res = await data.models.users.findAll()
  return res;
};

module.exports = userService;
