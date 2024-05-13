'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class Admins extends Model {
    static associate(models) {
    }
    // Hash password before saving to the database
    async hashPassword() {
      console.log('Password changed:', this.changed('password'));
      if (this.changed('password')) {
        this.password = await bcrypt.hash(this.password, 10);
      }
    }
  }

  Admins.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Admins',
    tableName: 'admins',
    timestamps: false,
    hooks: {
      beforeSave: async (user) => {
        console.log('Before saving user:', user.toJSON());
        await user.hashPassword();
      }
    }
  });
  return Admins;
};