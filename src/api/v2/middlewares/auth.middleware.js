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
exports.verifyAccessToken = void 0;
const expressHandler_1 = __importDefault(require("../util/expressHandler"));
const apiError_1 = __importDefault(require("../util/apiError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAccessToken = (0, expressHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accessToken } = req.cookies;
        if (!accessToken) {
            res
                .status(401)
                .json(new apiError_1.default(401, null, false, `No accessToken found.`));
            return;
        }
        jsonwebtoken_1.default.verify(accessToken, String(process.env.ACCESS_TOKEN_SECRET), (err, decoded) => {
            if (err) {
                const { message } = err;
                res.status(403).json(new apiError_1.default(403, err, false, message));
                return;
            }
            req.body.decodedUserName = decoded.userName;
            req.body.decodedUserId = decoded.id;
            next();
        });
        return;
    }
    catch (error) {
        console.error('Failed to verify accessToken:', error);
        const { message } = error;
        res.status(500).json(new apiError_1.default(500, error, false, message));
    }
}));
exports.verifyAccessToken = verifyAccessToken;
