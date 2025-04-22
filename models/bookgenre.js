'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bookGenre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  bookGenre.init({
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'books',
          key: 'id'
        },
      },
      genreId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'genres',
          key: 'id'
        },
      },
  }, {
    sequelize,
    tableName: 'bookGenres',
    modelName: 'bookGenre',
  });
  return bookGenre;
};