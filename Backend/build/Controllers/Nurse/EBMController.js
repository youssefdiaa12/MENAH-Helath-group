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
exports.SelectAllBottles = exports.CreateBottle = void 0;
const EBMModel_1 = require("../../Models/Nurse/EBMModel");
const CreateBottle = (EBMData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ebmModel = new EBMModel_1.EBMModel();
        const ebmCreationResponse = yield ebmModel.Create(EBMData);
        if (ebmCreationResponse) {
            return {
                Status: true,
                Data: ebmCreationResponse,
                Message: "Bottle is Created Successfully"
            };
        }
        return {
            Status: false,
            Data: null,
            Message: "Error while Creating bottle"
        };
    }
    catch (err) {
        throw new Error(`error in Creating bottle in ebm contoller: ${err}`);
    }
});
exports.CreateBottle = CreateBottle;
const SelectAllBottles = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ebmModel = new EBMModel_1.EBMModel();
        const ebmSearchResult = yield ebmModel.Select();
        if (ebmSearchResult) {
            return {
                Status: true,
                Data: ebmSearchResult,
                Message: "Bottles are retrieved successfully"
            };
        }
        return {
            Status: false,
            Data: null,
            Message: "No Bottles not found!"
        };
    }
    catch (err) {
        throw new Error(`error in selecting bottles in ebm contoller: ${err}`);
    }
});
exports.SelectAllBottles = SelectAllBottles;
