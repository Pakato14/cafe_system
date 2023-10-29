'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bill.init({
    uuid: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    contactNumber: DataTypes.STRING,
    paymentMethod: DataTypes.STRING,
    total: DataTypes.INTEGER,
    productDetails: DataTypes.JSON,
    createdBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Bill',
  });
  return Bill;
};