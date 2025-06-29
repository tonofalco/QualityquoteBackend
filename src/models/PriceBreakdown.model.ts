import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/config";

interface PriceBreakdownAttributes {
    id?: number; 
    concept: string;
    description: string;
    cost: number;
    pax: number;
    airEventId: number; 
}

export const PriceBreakdown = sequelize.define<Model<PriceBreakdownAttributes>>('priceBreakdown', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    concept: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cost: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    pax: {
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
