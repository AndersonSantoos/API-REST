"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const body_parser_1 = __importDefault(require("body-parser"));
const dbConfig_1 = require("./database/dbConfig");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const serviceRequestRoutes_1 = __importDefault(require("./routes/serviceRequestRoutes"));
const positionRoutes_1 = __importDefault(require("./routes/positionRoutes"));
const administratorRoutes_1 = __importDefault(require("./routes/administratorRoutes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || '@!!!1000@@#!',
    resave: false,
    saveUninitialized: false,
}));
app.use('/', userRoutes_1.default);
app.use('/', serviceRequestRoutes_1.default);
app.use('/', positionRoutes_1.default);
app.use('/', administratorRoutes_1.default);
app.listen(port, async () => {
    logger_1.default.info('Server in running on port ${port}');
    try {
        await dbConfig_1.sequelize.sync();
        logger_1.default.info('Models synced with database successfully');
    }
    catch (error) {
        logger_1.default.info(`Unable to sync with database`, error);
    }
});
