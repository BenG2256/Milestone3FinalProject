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
    static associate({ Users }) {
      // define association here
      Reviews.belongsTo(Users, {
        as: 'author',
        foreignKey: 'user_id'
      });
    }
  }
  //   Reviews.belongsTo(Locations, {
  //     foreignKey: "location_id",
  //   })
  // }
  // }
  Reviews.init({
    review_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating_description: {
      type: DataTypes.STRING,

    },
    // was user_id, not author_id
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    location_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
    {
      sequelize,
      modelName: 'Reviews',
      tableName: 'reviews',
      timestamps: false
    });
  return Reviews;
}