'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Category, Genre}) {
      // define association here
      this.belongsTo(Category, { foreignKey: 'categoryId' });
      this.belongsToMany(Genre,  { through: 'bookGenre', foreignKey: 'bookId' });
    }
  }
  Book.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bookUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    recommended: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    audio: {
       type: DataTypes.STRING,
       allowNull: true
     },
     audioDuration: {
       type: DataTypes.INTEGER,
       allowNull: true
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id'
       }
    },
    downloads: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: [],
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'books',
    modelName: 'Book',
  });
  return Book;
};