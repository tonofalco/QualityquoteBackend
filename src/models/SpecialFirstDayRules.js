const { sequelize } = require("../database/config")
const { DataTypes } = require("sequelize");

const SpecialFirstDayRules = sequelize.define('specialFirstDayRules', {

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
    sumEs: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

});

module.exports = SpecialFirstDayRules;