'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Book}) {
      // define association here
      this.belongsToMany(Book, {through: 'bookGenre', foreignKey: 'genreId'})

    }
  }
  Genre.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'genres',
    modelName: 'Genre',
  });
  return Genre;
};