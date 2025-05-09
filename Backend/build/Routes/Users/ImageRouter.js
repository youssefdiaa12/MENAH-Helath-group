"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const imagesRouter = (0, express_1.default)();
imagesRouter.use(express_1.default.static(path_1.default.join(__dirname, "../../../userProfileImages")));
imagesRouter.get('/userImages/:imageName', (req, res) => {
    try {
        const { imageName } = req.params;
        res.contentType('image/PNG');
        res.sendFile(path_1.default.join(__dirname, '../../../userProfileImages', imageName));
    }
    catch (err) {
        res.status(404).send('image is not found');
    }
});
imagesRouter.get('/babyImages/:imageName', (req, res) => {
    try {
        const { imageName } = req.params;
        res.contentType('image/PNG');
        res.sendFile(path_1.default.join(__dirname, '../../../babyPhotoes', imageName));
    }
    catch (err) {
        res.status(404).send('image is not found');
    }
});
imagesRouter.get('/motherImages/:imageName', (req, res) => {
    try {
        const { imageName } = req.params;
        res.contentType('image/PNG');
        res.sendFile(path_1.default.join(__dirname, '../../../motherPhotoes', imageName));
    }
    catch (err) {
        res.status(404).send('image is not found');
    }
});
exports.default = imagesRouter;
