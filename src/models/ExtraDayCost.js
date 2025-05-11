const { sequelize } = require("../database/config")
const { DataTypes } = require("sequelize");

const ExtraDayCost = sequelize.define('extraDayCost', {

    cost: {
        type: DataTypes.STRING,
        allowNull: false
    },
    valueEs: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    valueFs: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

module.exports = ExtraDayCost;