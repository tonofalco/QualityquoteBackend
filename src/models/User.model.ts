import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/config";

interface UserAttributes {
    name: string;
    email: string;
    password: string;
    role: string;
}

export const User = sequelize.define<Model<UserAttributes>>('user', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
});