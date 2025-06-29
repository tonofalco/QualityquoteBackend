import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/config";
import { User } from './User.model';

interface EarthEventAttributes {
    id: number; // Asumiendo que el ID es un número entero
    transportNumber: string;
    transport: string;
    seats: number;
    nameClient: string;
    phone: string;
    departure: string;
    destination: string;
    price: number;
    advance: number;
    start: Date;
    end: Date;
    status: string;
    notes?: string; // opcional porque no tiene `allowNull: false`
    userId: string;
}

export const EarthEvent = sequelize.define<Model<EarthEventAttributes>>('earthEvent', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
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
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    notes: {
        type: DataTypes.STRING
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

EarthEvent.belongsTo(User, { foreignKey: 'userId' });
