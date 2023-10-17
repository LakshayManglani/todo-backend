"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mysqlConnection = void 0;
const mysql_1 = __importDefault(require("mysql"));
// Connect to mysql by using this function
function connectMysql() {
    const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;
    exports.mysqlConnection = mysql_1.default.createConnection({
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASSWORD,
        database: MYSQL_DATABASE,
    });
    return new Promise((resolve, reject) => {
        exports.mysqlConnection.connect(function (err) {
            if (err) {
                reject(err);
            }
            console.log('📤 connected as id', exports.mysqlConnection.threadId);
            resolve(exports.mysqlConnection);
        });
    });
}
exports.default = connectMysql;
