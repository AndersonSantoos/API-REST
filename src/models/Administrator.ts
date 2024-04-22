import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/dbConfig';
import bcrypt from 'bcrypt';

class Administrator extends Model {
    public id!: number;
    public nome!: string;
    public cargo!: string;
    public email!: string;
    public senha!: string;
    public isAdmin!: boolean;

    static async bulkCreateAdministrators(administratorsData: any[]) {
        try {
            // Criptografar as senhas antes de armazená-las no banco de dados
            for (const admin of administratorsData) {
                const hashedSenha = await bcrypt.hash(admin.senha, 10);
                admin.senha = hashedSenha;
            }

            // Cadastrar os administradores no banco de dados
            return await this.bulkCreate(administratorsData);
        } catch (error) {
            throw new Error('Erro ao criar administradores em massa: ' + error);
        }
    }
}

Administrator.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cargo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false, // Por padrão, um administrador não é um administrador
        },
    },
    {
        sequelize,
        tableName: 'administrators',
    }
);

export default Administrator;
