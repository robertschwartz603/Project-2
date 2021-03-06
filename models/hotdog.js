const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Hotdog extends Model {}

Hotdog.init(
  {
    // IF WE DECIDE HOTDOGS NEED ID'S - uncomment below

    id: {  
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false, //added
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'hotdog',
  }
);

module.exports = Hotdog;
