const { sequelize } = require("../database/config_mysql")
const { DataTypes } = require("sequelize");

const Configuracion = sequelize.define('Configuracion', {

    //DIAS EXTRAS
    hotel_es: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    food_es: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    park_es: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    renueve_es: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    hotel_fs: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    food_fs: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    park_fs: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    renueve_fs: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

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

module.exports = Configuracion;