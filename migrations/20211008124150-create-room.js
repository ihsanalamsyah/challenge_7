'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Rooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_room: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false
      },
      player1: {
        type: Sequelize.STRING,
        allowNull: false
      },
      player2: {
        type: Sequelize.STRING,
        allowNull: false
      },
      choice1: {
        type: Sequelize.STRING
      },
      choice2: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Rooms');
  }
};