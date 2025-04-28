"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const UsersRoute_1 = __importDefault(require("./Routes/Users/UsersRoute"));
const ImageRouter_1 = __importDefault(require("./Routes/Users/ImageRouter"));
const Authentication_1 = require("./MiddleWares/Authentication");
const isNurse_1 = require("./MiddleWares/isNurse");
const BabyRoute_1 = __importDefault(require("./Routes/Nurse/BabyRoute"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 8080;
// Global MiddleWares
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// User Routes
app.use('/user', UsersRoute_1.default);
app.use('/image', ImageRouter_1.default);
app.use("/baby", Authentication_1.validateMiddleWare, isNurse_1.IsNurseValidation, BabyRoute_1.default);
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
