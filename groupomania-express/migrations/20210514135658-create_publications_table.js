'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  queryInterface.createTable('publications', {
    id: {
      type: Sequelize.STRING(36),
      allowNull: false,
      primaryKey: true
    },
    content: {
        type: Sequelize.STRING(1000),
        allowNull: false,
    },
    userId: {
        type: Sequelize.STRING(36),
        allowNull: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  });

  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('publications');
  }
};
