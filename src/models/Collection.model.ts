import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/config";

interface CollectionAttributes {
    id?: number; // Autogenerado
    date: Date;
    concept: string;
    tc: number;     // Tipo de cambio (double)
    tax: number;
    airEventId: number; // FK hacia AirEvent.id
}

export const Collection = sequelize.define<Model<CollectionAttributes>>('collection', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    concept: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tc: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    tax: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    airEventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'AirEvents',
            key: 'id'
        }
    }
});