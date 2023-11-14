const { sequelize } = require("../database/config_mysql")
const { DataTypes } = require('sequelize');
const Usuario = require('./Usuario');

const Evento = sequelize.define('Evento', {
    transport: {
        type: DataTypes.STRING,
        allowNull: false
    },
    seats: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    notes: {
        type: DataTypes.STRING
    },
    start: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end: {
        type: DataTypes.DATE,
        allowNull: false
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Evento.belongsTo(Usuario, { foreignKey: 'userId' });


module.exports = Evento;
