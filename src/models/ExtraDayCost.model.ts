import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/config";

interface ExtraDayCostAttributes {
    id: number;
    cost: string;
    valueEs: number;
    valueFs: number;
}

export const ExtraDayCost = sequelize.define<Model<ExtraDayCostAttributes>>('extraDayCost', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cost: {
        type: DataTypes.STRING,
        allowNull: false
    },
    valueEs: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    valueFs: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});
