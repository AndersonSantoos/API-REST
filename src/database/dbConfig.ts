import logger from '../logger'
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

sequelize.authenticate()
.then(() => {
    logger.info('Connected to the database successfully.');
})
.catch(err => {
    logger.error('Unable to connect to the database');
});

export { sequelize };