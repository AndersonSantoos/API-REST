import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/dbConfig';
import User from './User';
class ServiceRequest extends Model {
    public id!: number;
    public solicitacaoServico!: string;
    public userId!: number; // Chave estrangeira
    public email!: string; // Adicionando o email do usuário
    public positionId!: string; // Adicionando o cargo do usuário
}

ServiceRequest.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        solicitacaoServico: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        userId: { // Definindo a chave estrangeira
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        email: { // Adicionando o email do usuário
            type: DataTypes.STRING,
            allowNull: false,
        },
        positionId: { // Adicionando o cargo do usuário
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'serviceRequest',
    }
);

ServiceRequest.belongsTo(User, { foreignKey: 'userId' }); // Configurando o relacionamento com a tabela User

export default ServiceRequest;
