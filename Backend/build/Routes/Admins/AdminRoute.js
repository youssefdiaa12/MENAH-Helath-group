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
const AdminController_1 = require("../../Controllers/Admins/AdminController");
const AdminRouter = (0, express_1.default)();
AdminRouter.get("/calculations", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, AdminController_1.getCalculations)();
        res.json(response);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: `admin calculations error in admin routes: ${error}` });
    }
}));
AdminRouter.post("/unverifiedNurses", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
            res.status(400).json({ message: "body is required" });
            return;
        }
        const response = yield (0, AdminController_1.getUnverifiedNurses)(req.body.page);
        res.json(response);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: `error in retriving unverified nurses in admin routes: ${error}` });
    }
}));
AdminRouter.post("/unverifiedParents", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
            res.status(400).json({ message: "body is required" });
            return;
        }
        const response = yield (0, AdminController_1.getUnverifiedParents)(req.body.page);
        res.json(response);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: `error in retriving unverified parents in admin routes: ${error}` });
    }
}));
AdminRouter.post("/verify", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
            res.status(400).json({ message: "body is required" });
            return;
        }
        const response = yield (0, AdminController_1.VerifyUser)(req.body.username, req.body.phone);
        res.json(response);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: `error in verifying user in admin routes: ${error}` });
    }
}));
AdminRouter.post("/UnVerify", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
            res.status(400).json({ message: "body is required" });
            return;
        }
        const response = yield (0, AdminController_1.UnVerifyUser)(req.body.username, req.body.phone);
        res.json(response);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: `error in unverifying user in admin routes: ${error}` });
    }
}));
AdminRouter.post("/succeddVerifications", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
            res.status(400).json({ message: "body is required" });
            return;
        }
        const response = yield (0, AdminController_1.getBottleVerificationsSuccedd)(req.body.page);
        res.json(response);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: `error in retriving unverified parents in admin routes: ${error}` });
    }
}));
AdminRouter.post("/failedVerifications", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
            res.status(400).json({ message: "body is required" });
            return;
        }
        const response = yield (0, AdminController_1.getBottleVerificationsFailed)(req.body.page);
        res.json(response);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: `error in retriving unverified parents in admin routes: ${error}` });
    }
}));
AdminRouter.post("/history", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
            res.status(400).json({ message: "body is required" });
            return;
        }
        const response = yield (0, AdminController_1.getHistory)(req.body.username, req.body.page);
        res.json(response);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: `error in retriving login history in admin routes: ${error}` });
    }
}));
exports.default = AdminRouter;
