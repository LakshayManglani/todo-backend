"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatabases = void 0;
const db_1 = require("../db");
function getDatabases() {
    return new Promise((resolve, reject) => {
        db_1.mysqlConnection.query('SHOW DATABASES', (error, results, fields) => {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
    });
}
exports.getDatabases = getDatabases;
