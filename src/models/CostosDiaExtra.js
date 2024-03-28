const { sequelize } = require("../database/config")
const { DataTypes } = require("sequelize");

const CostosDiaExtra = sequelize.define('CostosDiaExtra', {

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

module.exports = CostosDiaExtra;