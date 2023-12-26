const { sequelize } = require("../database/config_mysql")
const { DataTypes } = require("sequelize");

const Usuario = sequelize.define('Usuario', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = Usuario;