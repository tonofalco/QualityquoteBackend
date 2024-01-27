const { sequelize } = require("../database/config_mysql")
const { DataTypes } = require('sequelize');
const Usuario = require('./Usuario');

const Evento = sequelize.define('Evento', {
    transportNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    transport: {
        type: DataTypes.STRING,
        allowNull: false
    },
    seats: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nameClient: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    departure: {
        type: DataTypes.STRING,
        allowNull: false
    },
    destination: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    advance: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    start: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end: {
        type: DataTypes.DATE,
        allowNull: false
    },
    // title: {
    //     type: DataTypes.STRING,
    //     allowNull: false
    // },
    notes: {
        type: DataTypes.STRING
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Evento.belongsTo(Usuario, { foreignKey: 'userId' });


module.exports = Evento;
