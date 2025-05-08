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
const isAdmin_1 = require("./MiddleWares/isAdmin");
const isNurse_1 = require("./MiddleWares/isNurse");
const MotherRouter_1 = __importDefault(require("./Routes/Nurse/MotherRouter"));
const EBMRoute_1 = __importDefault(require("./Routes/Nurse/EBMRoute"));
const MessagesRoute_1 = __importDefault(require("./Routes/Messages/MessagesRoute"));
const AdminRoute_1 = __importDefault(require("./Routes/Admins/AdminRoute"));
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
app.use("/bottle", Authentication_1.validateMiddleWare, isNurse_1.IsNurseValidation, EBMRoute_1.default);
app.use("/message", Authentication_1.validateMiddleWare, MessagesRoute_1.default);
app.use("/admin", Authentication_1.validateMiddleWare, isAdmin_1.IsAdminValidation, AdminRoute_1.default);
app.use("/mother", Authentication_1.validateMiddleWare, isNurse_1.IsNurseValidation, MotherRouter_1.default);
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
