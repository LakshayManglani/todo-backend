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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
// I have configured env varibles here so that import statements below them can get it.
(0, dotenv_1.config)({ path: './.env' });
const express_1 = __importDefault(require("express"));
const v2_1 = __importDefault(require("./v2"));
const PORT = Number(process.env.PORT) || 4040;
const app = (0, express_1.default)();
function startAllServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // await startServerV1(app);
            yield (0, v2_1.default)(app);
            app.listen(PORT, () => {
                console.log('\n⚙️  All Servers are running on port:', PORT);
            });
        }
        catch (error) {
            console.log('Failed to start all server: ', error);
        }
    });
}
if (process.env.ENVIRONMENT === 'development') {
    startAllServer();
}
