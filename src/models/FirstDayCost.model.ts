import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/config";

interface FirstDayCostAttributes {
    gasoline: number;
    salary: number;
    booths: number;
    maintenance: number;
    utility: number;
    supplement: number;
}

export const FirstDayCost = sequelize.define<Model<FirstDayCostAttributes>>('firstDayCost', {
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
