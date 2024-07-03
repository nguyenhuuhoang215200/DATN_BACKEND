
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Allcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Allcode.init({
    key: DataTypes.STRING,
    type: DataTypes.STRING,
    values_Eng: DataTypes.STRING,
    values_Vi: DataTypes.STRING,
    sequelize,
  }, {
    sequelize,
    modelName: 'Allcode',
  });
  return Allcode;
};