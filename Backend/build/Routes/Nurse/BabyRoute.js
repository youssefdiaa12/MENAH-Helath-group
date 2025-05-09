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
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const babyRouter = (0, express_1.default)();
let imagename = '';
// configuring multer to be able to recieve images in the request body
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'babyPhotoes/');
    },
    filename: (req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
        imagename = uniqueName;
        cb(null, uniqueName);
    }
});
const upload = (0, multer_1.default)({ storage });
// baby creation route
babyRouter.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
            res.status(400).json({ message: "body is required" });
            return;
        }
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
        if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
            res.status(400).json({ message: "body is required" });
            return;
        }
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
        if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
            res.status(400).json({ message: "body is required" });
            return;
        }
        const mrn = req.body.mrn;
        const visitNumber = req.body.visitNumber;
        const response = yield (0, BabyController_1.UpdateBabyVisitNumber)(visitNumber, mrn);
        res.json(response);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: `baby visit number update error in baby routes: ${error}` });
    }
}));
babyRouter.post('/savePhoto', upload.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { mrn, category } = req.body;
        const image = req.file;
        if (!mrn) {
            res.status(400).json({ message: "mrn is required" });
            return;
        }
        if (!category) {
            res.status(400).json({ message: "category is required" });
            return;
        }
        if (category != "face" && category != "foot" && category != 'retina') {
            res.status(400).json({ message: "category must be face or foot or retina" });
            return;
        }
        if (!image) {
            res.status(400).json({ message: "image is required" });
            return;
        }
        console.log(imagename);
        const response = yield (0, BabyController_1.SaveBabyPhoto)(req.body.mrn, `${process.env.BABYIMAGE}${imagename}`, req.body.category);
        res.json(response);
    }
    catch (error) {
        throw new Error(`baby saving photo error in baby routes: ${error}`);
    }
}));
exports.default = babyRouter;
