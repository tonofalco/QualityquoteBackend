const { sequelize } = require("../database/config")
const { DataTypes } = require("sequelize");

const CostosEspecialesPrimerDia = sequelize.define('CostosEspecialesPrimerDia', {

    //COSTOS ESPECIALES
    kms: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    mult: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sum: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

});

module.exports = CostosEspecialesPrimerDia;