// User.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/dbConfig';
import Position from './Position';
class User extends Model {
    public id!: number;
    public email!: string;
    public fullName!: string;
    public positionId!: number;
    public password!: string;
    public apiKey?: string;
    // Método para evitar que o campo password seja excluído nos resultados JSON
    toJSON() {
        const values = Object.assign({}, this.get());
        delete values.password;
        return values;
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
            },
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        positionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Position',
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        apiKey: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        tableName: 'users',
    }
);

// Define a associação entre User e Position
User.belongsTo(Position, { foreignKey: 'positionId', as: 'position' });

export default User;
