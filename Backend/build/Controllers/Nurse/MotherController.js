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
exports.AddMotherInfo = void 0;
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
        if (motherResponse) {
            return {
                Status: true,
                Data: motherResponse,
                Message: "Mother Info is added Successfully"
            };
        }
        return {
            Status: false,
            Data: null,
            Message: "Error while adding mother info"
        };
    }
    catch (err) {
        throw new Error(`error in adding mother info in mother contoller: ${err}`);
    }
});
exports.AddMotherInfo = AddMotherInfo;
