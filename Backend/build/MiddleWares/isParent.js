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
exports.IsParentValidation = void 0;
const IsParentValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user || user.role !== 'user') {
            res.status(403).json({ message: "Access denied: only parents can access this endpoint" });
            return;
        }
        next();
    }
    catch (error) {
        let statusCode = 403;
        let message = 'Access denied, Parents can only access this endpoint';
        res.status(statusCode).json(message);
        return;
    }
});
exports.IsParentValidation = IsParentValidation;
