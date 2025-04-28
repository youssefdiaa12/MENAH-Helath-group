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
exports.validateMiddleWare = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const validateMiddleWare = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            res.status(401).json('Access denied, no token provided');
            return;
        }
        const token = authorizationHeader.split(' ')[1];
        const payload = jsonwebtoken_1.default.verify(token, process.env.TOKENSECRET);
        if (!payload.isActive) {
            res.status(401).json("Admin has not approved you yet, please wait");
        }
        req.user = payload;
        next();
    }
    catch (error) {
        let statusCode = 401;
        let message = 'Access denied, invalid token';
        res.status(statusCode).json(message);
        return;
    }
});
exports.validateMiddleWare = validateMiddleWare;
