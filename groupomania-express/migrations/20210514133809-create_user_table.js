'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  queryInterface.createTable('users', {
    id: {
      type: Sequelize.STRING(36),
      allowNull: false,
      primaryKey: true
    },
    mail: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
    },
    firstname: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    status: Sequelize.STRING(100),
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  });

  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('users');
  }
};
