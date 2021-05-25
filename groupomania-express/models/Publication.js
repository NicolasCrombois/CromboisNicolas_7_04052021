const Sequelize = require("sequelize");
const sequelize = require("../database/connection");

module.exports = sequelize.define("Publication", {
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
    }
})