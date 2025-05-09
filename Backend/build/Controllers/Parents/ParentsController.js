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
exports.getProfile = exports.getCalculations = exports.getParentEBM = exports.getParentBabies = void 0;
const ParentsModel_1 = require("../../Models/Parents/ParentsModel");
const getParentBabies = (page, mother_mrn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (page == null || page == undefined) {
            return {
                Status: false,
                Data: null,
                Message: "page is required"
            };
        }
        if (!Number.isInteger(page)) {
            return {
                Status: false,
                Data: null,
                Message: "Page must be an integer."
            };
        }
        if (typeof mother_mrn !== 'string' || !mother_mrn.trim()) {
            return {
                Status: false,
                Data: null,
                Message: "mother mrn must be a non-empty string."
            };
        }
        if (mother_mrn.length != 12) {
            return {
                Status: false,
                Data: null,
                Message: "mother mrn must be 12 characters"
            };
        }
        const parentModel = new ParentsModel_1.ParentModel();
        const allbabies = yield parentModel.SelectBabies(mother_mrn, page);
        if (typeof allbabies != "string") {
            return {
                Status: true,
                Data: allbabies,
                Message: "Mother's Babies are retrieved Successfully"
            };
        }
        return {
            Status: false,
            Data: null,
            Message: allbabies
        };
    }
    catch (err) {
        throw new Error(`error in retriving mother babies in parent contoller: ${err}`);
    }
});
exports.getParentBabies = getParentBabies;
const getParentEBM = (page, mother_mrn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (page == null || page == undefined) {
            return "page is required";
        }
        if (!Number.isInteger(page)) {
            return ("Page must be an integer.");
        }
        if (typeof mother_mrn !== 'string' || !mother_mrn.trim()) {
            return "mother mrn must be a non-empty string.";
        }
        if (mother_mrn.length != 12) {
            return "mother mrn must be 12 characters";
        }
        const parentModel = new ParentsModel_1.ParentModel();
        const allEBMS = yield parentModel.SelectEBM(mother_mrn, page);
        if (typeof allEBMS != "string") {
            return {
                Status: true,
                Data: allEBMS,
                Message: "Mother's EBM are retrieved Successfully"
            };
        }
        return {
            Status: false,
            Data: null,
            Message: allEBMS
        };
    }
    catch (err) {
        throw new Error(`error in retriving mother EBM in parent contoller: ${err}`);
    }
});
exports.getParentEBM = getParentEBM;
const getCalculations = (mother_mrn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (typeof mother_mrn !== 'string' || !mother_mrn.trim()) {
            return "mother mrn must be a non-empty string.";
        }
        if (mother_mrn.length != 12) {
            return "mother mrn must be 12 characters";
        }
        const parentModel = new ParentsModel_1.ParentModel();
        const calc = yield parentModel.Calculations(mother_mrn);
        if (typeof calc != "string") {
            return {
                Status: true,
                Data: calc,
                Message: "Mother's calculations are retrieved Successfully"
            };
        }
        return {
            Status: false,
            Data: null,
            Message: calc
        };
    }
    catch (err) {
        throw new Error(`error in calculating mother statistics in parent contoller: ${err}`);
    }
});
exports.getCalculations = getCalculations;
const getProfile = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (typeof user_id !== 'string' || !user_id.trim()) {
            return "User id must be a non-empty string.";
        }
        const parentModel = new ParentsModel_1.ParentModel();
        const user = yield parentModel.SelectUser(user_id);
        if (typeof user != "string") {
            return {
                Status: true,
                Data: user,
                Message: "User Profile is retrieved Successfully"
            };
        }
        return {
            Status: false,
            Data: null,
            Message: user
        };
    }
    catch (err) {
        throw new Error(`error in retriving user info in parent contoller: ${err}`);
    }
});
exports.getProfile = getProfile;
