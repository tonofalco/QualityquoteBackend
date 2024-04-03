const { sequelize } = require("../database/config")
const { DataTypes } = require("sequelize");

const CostosTablaKms = sequelize.define('CostosTablaKms', {

    //TABLA KMS
    gasoline: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    salary: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    booths: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    maintenance: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    utility: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    supplement: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },

});

module.exports = CostosTablaKms;