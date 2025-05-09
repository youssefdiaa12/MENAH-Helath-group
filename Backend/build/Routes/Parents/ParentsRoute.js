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
const ParentsController_1 = require("../../Controllers/Parents/ParentsController");
const ParentRouter = (0, express_1.default)();
ParentRouter.post("/babies", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
            res.status(400).json({ message: "body is required" });
            return;
        }
        const response = yield (0, ParentsController_1.getParentBabies)(req.body.page, req.body.mother_mrn);
        res.json(response);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: `babies retrieval error in parent routes: ${error}` });
    }
}));
ParentRouter.post("/EBM", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
            res.status(400).json({ message: "body is required" });
            return;
        }
        const response = yield (0, ParentsController_1.getParentEBM)(req.body.page, req.body.mother_mrn);
        res.json(response);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: `EBM retrieval error in parent routes: ${error}` });
    }
}));
ParentRouter.post("/calculations", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
            res.status(400).json({ message: "body is required" });
            return;
        }
        const response = yield (0, ParentsController_1.getCalculations)(req.body.mother_mrn);
        res.json(response);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: `mother calculations error in parent routes: ${error}` });
    }
}));
exports.default = ParentRouter;
