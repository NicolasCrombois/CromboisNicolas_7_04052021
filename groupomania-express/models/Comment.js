const Sequelize = require("sequelize");
const sequelize = require("../database/connection");

module.exports = sequelize.define("Comment", {
    id: {
        type: Sequelize.STRING(36),
        allowNull: false,
        autoIncrement: true,
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
    }
})