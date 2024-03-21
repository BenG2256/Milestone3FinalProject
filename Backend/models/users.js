'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate({ Reviews }) {
      Users.hasMany(Reviews, {
        foreignKey: 'user_id'
      });
    }
    // Hash password before saving to the database
    async hashPassword() {
      console.log('Password changed:', this.changed('password'));
      if (this.changed('password')) {
        this.password = await bcrypt.hash(this.password, 10);
      }
    }
    
  }

  Users.init({
    user_id: {
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
    city_state: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Users',
    tableName: 'users',
    timestamps: false,
    hooks: {
      beforeSave: async (user) => {
        console.log('Before saving user:', user.toJSON());
        await user.hashPassword();
      }
    }
  });
  return Users;
};