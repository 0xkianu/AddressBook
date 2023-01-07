var DataTypes = require("sequelize").DataTypes;
var _contact = require("./contact");

function initModels(sequelize) {
  var contact = _contact(sequelize, DataTypes);


  return {
    contact,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
