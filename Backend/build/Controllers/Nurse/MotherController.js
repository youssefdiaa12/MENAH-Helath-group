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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveMotherPhoto = exports.AddMotherInfo = void 0;
const MotherType_1 = require("../../Types/Nurse/MotherType");
const MotherModel_1 = require("../../Models/Nurse/MotherModel");
const AddMotherInfo = (motherInfo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = (0, MotherType_1.validateMotherInfo)(motherInfo);
        if (!result.isValid) {
            return result.message;
        }
        const motherModel = new MotherModel_1.MotherModel();
        const motherResponse = yield motherModel.Create(motherInfo);
        if (typeof motherResponse != "string") {
            return {
                Status: true,
                Data: motherResponse,
                Message: "Mother Info is added Successfully"
            };
        }
        return {
            Status: false,
            Data: null,
            Message: motherResponse
        };
    }
    catch (err) {
        throw new Error(`error in adding mother info in mother contoller: ${err}`);
    }
});
exports.AddMotherInfo = AddMotherInfo;
const SaveMotherPhoto = (mrn, url, category) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (typeof mrn != "string" || !mrn.trim()) {
            return {
                Status: false,
                Data: null,
                Message: "Baby's mrn must be a non-empty string."
            };
        }
        if (mrn.length != 12) {
            return {
                Status: false,
                Data: null,
                Message: "Baby's mrn must be a non-empty string."
            };
        }
        if (typeof url != "string" || !url.trim()) {
            return {
                Status: false,
                Data: null,
                Message: "url must be a non-empty string."
            };
        }
        if (typeof category != "string" || !category.trim()) {
            return {
                Status: false,
                Data: null,
                Message: "category must be a non-empty string."
            };
        }
        if (mrn.length != 12) {
            return {
                Status: false,
                Data: null,
                Message: "Baby's mrn must be string of length 12"
            };
        }
        const motherModel = new MotherModel_1.MotherModel();
        const MotherPhotoSaving = yield motherModel.SaveMotherPhoto(mrn, url, category);
        if (MotherPhotoSaving) {
            return {
                Status: true,
                Data: MotherPhotoSaving,
                Message: `Mother ${category} photo is saved successfully`
            };
        }
        return {
            Status: false,
            Data: null,
            Message: "Mother not found!"
        };
    }
    catch (err) {
        throw new Error(`error in saving Mother photo in mother contoller: ${err}`);
    }
});
exports.SaveMotherPhoto = SaveMotherPhoto;
