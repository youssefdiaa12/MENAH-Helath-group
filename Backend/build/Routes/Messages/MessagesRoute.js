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
const MessageController_1 = require("../../Controllers/Messages/MessageController");
const MessageRouter = (0, express_1.default)();
MessageRouter.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messData = req.body;
        const response = yield (0, MessageController_1.CreateMessage)(messData);
        res.json(response);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: `Message creation error in Message routes: ${error}` });
    }
}));
MessageRouter.post("/sent", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        const response = yield (0, MessageController_1.SelectMySentMessages)(id);
        res.json(response);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: `Message syncing error in Message routes: ${error}` });
    }
}));
MessageRouter.post("/markAsRead", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.userId;
        const messageId = req.body.id;
        const response = yield (0, MessageController_1.MarkAsRead)(userId, messageId);
        res.json(response);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: `Message updating error in Message routes: ${error}` });
    }
}));
MessageRouter.post("/recievings", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        const response = yield (0, MessageController_1.SelectMyrecieverMessages)(id);
        res.json(response);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: `Message syncing error in Message routes: ${error}` });
    }
}));
exports.default = MessageRouter;
