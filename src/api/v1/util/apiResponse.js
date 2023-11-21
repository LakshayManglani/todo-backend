"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiResponse {
    constructor(statusCode, data, message, success) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = success;
    }
}
exports.default = ApiResponse;
