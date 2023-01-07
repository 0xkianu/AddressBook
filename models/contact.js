'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  contact.init({
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    email: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipcode: DataTypes.STRING,
    address1: DataTypes.STRING,
    address2: DataTypes.STRING,
    phone: DataTypes.STRING,
    fav: DataTypes.BOOLEAN
  }, {
    sequelize,
    timestamps: false,
    modelName: 'contact',
  });
  return contact;
};