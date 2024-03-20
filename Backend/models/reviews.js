'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users, Locations}) {
      // define association here
      Reviews.belongsTo(Users, {
        foreignKey: "user_id",
      });

      Reviews.belongsTo(Locations, {
        foreignKey: "location_id",
      })
    }
  }
  Reviews.init({
    rating_id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rating:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating_description:  {
      type: DataTypes.STRING,

  },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "user_id"
      },
    },
    location_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Locations",
        key: "location_id"
      },
    },
    },
  {
    sequelize,
    modelName: 'Reviews',
    tableName: 'reviews',
    timestamps: false
  });
  return Reviews;
};