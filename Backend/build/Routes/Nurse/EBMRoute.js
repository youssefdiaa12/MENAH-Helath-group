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
const EBMController_1 = require("../../Controllers/Nurse/EBMController");
const EBMRouter = (0, express_1.default)();
EBMRouter.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ebmData = req.body;
        const response = yield (0, EBMController_1.CreateBottle)(ebmData);
        res.json(response);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: `bottle creation error in ebm routes: ${error}` });
    }
}));
EBMRouter.post("/selectBottle", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, EBMController_1.SelectBottle)(req.body.id);
        res.json(response);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: `bottle selection error in ebm routes: ${error}` });
    }
}));
EBMRouter.get("/select", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, EBMController_1.SelectAllBottles)();
        res.json(response);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: `bottle selection error in ebm routes: ${error}` });
    }
}));
EBMRouter.post("/use", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ebmData = req.body;
        const response = yield (0, EBMController_1.UseBottle)(ebmData);
        res.json(response);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: `bottle Usage error in ebm routes: ${error}` });
    }
}));
EBMRouter.post("/addVerification", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const verificationData = req.body;
        const response = yield (0, EBMController_1.addVerification)(verificationData);
        res.json(response);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: `verification addition error in ebm routes: ${error}` });
    }
}));
EBMRouter.post("/verify", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, EBMController_1.verify)(req.body.id, req.body.value, req.body.second_nurse, req.body.status);
        res.json(response);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: `verification updating error in ebm routes: ${error}` });
    }
}));
exports.default = EBMRouter;
