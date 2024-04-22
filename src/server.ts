import logger from './logger'
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import { sequelize } from './database/dbConfig';
import userRoutes from './routes/userRoutes';
import serviceRequestRoutes from './routes/serviceRequestRoutes';
import positionRoutes from './routes/positionRoutes';
import administratorRoutes from './routes/administratorRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET || '@!!!1000@@#!',
    resave: false,
    saveUninitialized: false,
}));
app.use('/', userRoutes);
app.use('/', serviceRequestRoutes);
app.use('/', positionRoutes);
app.use('/', administratorRoutes);

//Define o tipo da sessão do Express como CustomSession
declare module 'express-session' {
  interface SessionData {
    token?: string;
  }
}

app.listen(port, async() => {
    logger.info('Server in running on port ${port}');
    try {
        await sequelize.sync();
        logger.info('Models synced with database successfully')
    } catch (error) {
        logger.info(`Unable to sync with database`, error)
    }
});
