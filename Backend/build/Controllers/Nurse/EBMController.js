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
exports.verify = exports.addVerification = exports.UseBottle = exports.SelectBottleUsage = exports.SelectBottle = exports.SelectAllBottles = exports.CreateBottle = void 0;
const EBMType_1 = require("../../Types/Nurse/EBMType");
const EBMModel_1 = require("../../Models/Nurse/EBMModel");
const VerificationType_1 = require("../../Types/Nurse/VerificationType");
const CreateBottle = (EBMData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = (0, EBMType_1.validateEbmInfo)(EBMData);
        if (!result.isValid) {
            return {
                Status: false,
                Data: null,
                Message: result.message
            };
        }
        const ebmModel = new EBMModel_1.EBMModel();
        const ebmCreationResponse = yield ebmModel.Create(EBMData);
        if (typeof ebmCreationResponse != "string") {
            return {
                Status: true,
                Data: ebmCreationResponse,
                Message: "Bottle is Created Successfully"
            };
        }
        return {
            Status: false,
            Data: null,
            Message: ebmCreationResponse
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
const SelectBottle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (typeof id != "string" || !id.trim()) {
            return {
                Status: false,
                Data: null,
                Message: "id must be a non-empty string."
            };
        }
        const ebmModel = new EBMModel_1.EBMModel();
        const ebmSearchResult = yield ebmModel.SelectBottle(id);
        if (ebmSearchResult) {
            return {
                Status: true,
                Data: ebmSearchResult,
                Message: "Bottle are retrieved successfully"
            };
        }
        return {
            Status: false,
            Data: null,
            Message: "No Bottle not found!"
        };
    }
    catch (err) {
        throw new Error(`error in selecting bottles in ebm contoller: ${err}`);
    }
});
exports.SelectBottle = SelectBottle;
const SelectBottleUsage = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ebmModel = new EBMModel_1.EBMModel();
        const ebmSearchResult = yield ebmModel.selectAllBottleUsage();
        if (ebmSearchResult) {
            return {
                Status: true,
                Data: ebmSearchResult,
                Message: "Bottle Usage are retrieved successfully"
            };
        }
        return {
            Status: false,
            Data: null,
            Message: "No Bottle Usage not found!"
        };
    }
    catch (err) {
        throw new Error(`error in selecting bottles usage in ebm contoller: ${err}`);
    }
});
exports.SelectBottleUsage = SelectBottleUsage;
const UseBottle = (info) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = (0, EBMType_1.validateBottleUsageInfo)(info);
        if (!result.isValid) {
            return {
                Status: false,
                Data: null,
                Message: result.message
            };
        }
        const ebmModel = new EBMModel_1.EBMModel();
        const ebmUsageResult = yield ebmModel.CreateBottleUsage(info.bottle_id, info.total_volume, info.total_volume_used, info.total_volume_discarded, info.date_of_usage);
        if (typeof ebmUsageResult != "string") {
            return {
                Status: true,
                Data: ebmUsageResult,
                Message: "Bottle Usage is done successfully"
            };
        }
        return {
            Status: false,
            Data: null,
            Message: ebmUsageResult
        };
    }
    catch (err) {
        throw new Error(`error in subtracting bottles volume in ebm contoller: ${err}`);
    }
});
exports.UseBottle = UseBottle;
const addVerification = (info) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = (0, VerificationType_1.validateVerification)(info);
        if (!result.isValid) {
            return {
                Status: false,
                Data: null,
                Message: result.message
            };
        }
        const verificationModel = new EBMModel_1.EBMModel();
        const verificationResult = yield verificationModel.AddVerification(info);
        if (typeof verificationResult != "string") {
            return {
                Status: true,
                Data: verificationResult,
                Message: "verification is added successfully"
            };
        }
        return {
            Status: false,
            Data: null,
            Message: verificationResult
        };
    }
    catch (err) {
        throw new Error(`error in adding verification in ebm contoller: ${err}`);
    }
});
exports.addVerification = addVerification;
const verify = (id, value, second_nurse, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validStatuses = ['completed', 'failed'];
        const validValue = [true, false];
        if (!validStatuses.includes(status)) {
            return {
                Status: false,
                Data: null,
                Message: 'Invalid status. Must be "completed" or "failed".'
            };
        }
        if (!validValue.includes(value)) {
            return {
                Status: false,
                Data: null,
                Message: 'Invalid value. Must be true or false.'
            };
        }
        if (id == null || value == null || second_nurse == null || status == null) {
            return {
                Status: false,
                Data: null,
                Message: 'Data is missing'
            };
        }
        if ((value == false && status != 'failed') || (value == true && status != 'completed')) {
            return "value true is for status completed and value false is for status failed";
        }
        const verificationModel = new EBMModel_1.EBMModel();
        const verificationResult = yield verificationModel.verify(id, value, second_nurse, status);
        if (typeof verificationResult != "string") {
            return {
                Status: true,
                Data: verificationResult,
                Message: "verification is updated successfully"
            };
        }
        return {
            Status: false,
            Data: null,
            Message: verificationResult
        };
    }
    catch (err) {
        throw new Error(`error in updating verification in ebm contoller: ${err}`);
    }
});
exports.verify = verify;
