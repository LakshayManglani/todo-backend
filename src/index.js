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
// FIXME: Can we shift this config statement after all import statement without breaking .env access to all file.
(0, dotenv_1.config)({ path: './.env' });
const index_1 = __importDefault(require("./db/index"));
const app_1 = __importDefault(require("./app"));
const PORT = Number(process.env.PORT) || 4040;
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, index_1.default)();
            app_1.default.listen(PORT, () => {
                console.log('⚙️  Server is running on port:', PORT);
            });
        }
        catch (error) {
            console.error('error connecting to mysql:', error);
            process.exit(1);
        }
    });
}
startServer();
