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
const express_1 = __importDefault(require("express"));
const MotherController_1 = require("../../Controllers/Nurse/MotherController");
const motherRouter = (0, express_1.default)();
motherRouter.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const motherData = req.body;
        const response = yield (0, MotherController_1.AddMotherInfo)(motherData);
        res.json(response);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: `mother info error in mother routes: ${error}` });
    }
}));
exports.default = motherRouter;
