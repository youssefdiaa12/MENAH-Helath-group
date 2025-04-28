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
const BabyController_1 = require("../../Controllers/Nurse/BabyController");
const babyRouter = (0, express_1.default)();
// baby creation route
babyRouter.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const babyData = req.body;
        const response = yield (0, BabyController_1.CreateBaby)(babyData);
        res.json(response);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: `baby creation error in baby routes: ${error}` });
    }
}));
babyRouter.post("/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchValue = req.body.value;
        const searchField = req.body.field;
        const response = yield (0, BabyController_1.SearchBaby)(searchValue, searchField);
        res.json(response);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: `baby searching error in baby routes: ${error}` });
    }
}));
babyRouter.post("/updateVisitNumber", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mrn = req.body.mrn;
        const visitNumber = req.body.visitNumber;
        const response = yield (0, BabyController_1.UpdateBabyVisitNumber)(mrn, visitNumber);
        res.json(response);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: `baby visit number update error in baby routes: ${error}` });
    }
}));
exports.default = babyRouter;
