"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError {
    constructor(statusCode, error, success, message) {
        this.statusCode = statusCode;
        this.error = error;
        this.success = success;
        this.message = message;
    }
}
exports.default = ApiError;
