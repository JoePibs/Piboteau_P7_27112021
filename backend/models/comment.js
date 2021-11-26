'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  comment.init({
    content: DataTypes.STRING,
    content_image: DataTypes.STRING,
    content_link: DataTypes.STRING,
    date_creation: DataTypes.STRING,
    last_update: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    like:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};