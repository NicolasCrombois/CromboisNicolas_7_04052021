'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  queryInterface.createTable('comments', {
    id: {
      type: Sequelize.STRING(36),
      allowNull: false,
      primaryKey: true
    },
    userId: {
        type: Sequelize.STRING(36),
        allowNull: false,
    },
    publicationId: {
        type: Sequelize.STRING(36),
        allowNull: false,
    },
    content:  {
      type: Sequelize.STRING(500),
      allowNull: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  });

  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('comments');
  }
};
