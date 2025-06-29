import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/config";

import { PriceBreakdown } from './PriceBreakdown.model';
import { Collection } from './Collection.model';
import { User } from './User.model';

interface AirEventAttributes {
    id?: number; // opcional porque se genera automáticamente con autoIncrement
    startDate: Date;
    endDate: Date;
    destination: string;
    customerName: string;
    userId: string;
}

export const AirEvent = sequelize.define<Model<AirEventAttributes>>('airEvent', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    destination: {
        type: DataTypes.STRING,
        allowNull: false
    },
    customerName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Relación uno a muchos
AirEvent.hasMany(PriceBreakdown, {
    foreignKey: 'airEventId',
    as: 'priceBreakdowns'
});

PriceBreakdown.belongsTo(AirEvent, {
    foreignKey: 'airEventId'
});

// Relación uno a muchos
AirEvent.hasMany(Collection, {
    foreignKey: 'airEventId',
    as: 'collection'
});

Collection.belongsTo(AirEvent, {
    foreignKey: 'airEventId'
});

AirEvent.belongsTo(User, { foreignKey: 'userId' });
