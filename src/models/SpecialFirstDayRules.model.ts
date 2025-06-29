import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/config";

interface SpecialFirstDayRulesAttributes {
    id: number;
    kms: number;
    mult: number;
    sum: number;
    sumEs: number;
}

export const SpecialFirstDayRules = sequelize.define<Model<SpecialFirstDayRulesAttributes>>('specialFirstDayRules', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
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