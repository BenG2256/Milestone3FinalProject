'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Locations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Reviews}) {
      // define association here
      Locations.hasMany(Reviews, {
        foreignKey: "location_id"
      });
    }
  }
  Locations.init({
    location_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Locations',
    tableName: 'locations',
    timestamps: false,
  });
  return Locations;
};