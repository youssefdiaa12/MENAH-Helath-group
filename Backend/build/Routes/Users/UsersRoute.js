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
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const UserController_1 = require("../../Controllers/Users/UserController");
dotenv_1.default.config();
const userRouter = (0, express_1.default)();
let imagename = '';
// configuring multer to be able to recieve images in the request body
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'userProfileImages/');
    },
    filename: (req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
        imagename = uniqueName;
        cb(null, uniqueName);
    }
});
const upload = (0, multer_1.default)({ storage });
// signing user in the system
userRouter.post('/signup', upload.single('profileImage'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, UserController_1.createUser)(req.body.username, req.body.firstname, req.body.lastname, req.body.mobile, `${process.env.IMAGEROUTE}${imagename}`, req.body.password, req.body.profileType);
        res.json(response);
    }
    catch (error) {
        throw new Error(`user creation error in user routes: ${error}`);
    }
}));
// signing user in the system
userRouter.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, UserController_1.LogginUserIn)(req.body.username, req.body.password);
        res.json(response);
    }
    catch (error) {
        throw new Error(`user loggin in error in user routes: ${error}`);
    }
}));
exports.default = userRouter;
