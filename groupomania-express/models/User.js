const Sequelize = require("sequelize");
const sequelize = require("../database/connection");

module.exports = sequelize.define("User", {
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
    status: Sequelize.STRING(100)
})