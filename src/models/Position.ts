import { Model, DataTypes} from 'sequelize';
import { sequelize } from '../database/dbConfig';
class Position extends Model {
    public id!: number;
    public position!: string;
}

Position.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        position: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    },
        {
            sequelize,
            tableName: 'position',
        },
);

export default Position;