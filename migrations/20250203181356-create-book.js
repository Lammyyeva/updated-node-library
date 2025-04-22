'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
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
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('books');
  }
};