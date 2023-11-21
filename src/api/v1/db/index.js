"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE_V1 } = process.env;
// Config related to database
const sequelize = new sequelize_1.Sequelize({
    dialect: 'mysql',
    username: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE_V1,
    host: MYSQL_HOST,
    logging: false,
});
exports.sequelize = sequelize;
// Function to authenticate database connection
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // So that every table can be created if doesn't exists
            yield sequelize.sync();
            console.log(`\n📤 ${MYSQL_DATABASE_V1} Database connected`);
        }
        catch (error) {
            console.error(`\nFailed to connect to the ${MYSQL_DATABASE_V1} database:`, error);
            // Terminate Nodejs so that the execution stops
            process.exit(1);
        }
    });
}
exports.default = connectToDatabase;
