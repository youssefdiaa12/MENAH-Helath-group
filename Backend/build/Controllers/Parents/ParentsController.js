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
const getParentBabies = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (typeof username !== 'string' || !username.trim()) {
            return {
                Status: false,
                Data: null,
                Message: "username must be a non-empty string."
            };
        }
        const parentModel = new ParentsModel_1.ParentModel();
        const allbabies = yield parentModel.SelectBabies(username);
        if (typeof allbabies != "string") {
            return {
                Status: true,
                Data: allbabies,
                Message: "Mother's Babies are retrieved Successfully"
            };
        }
        return {
            Status: true,
            Data: null,
            Message: allbabies
        };
    }
    catch (err) {
        throw new Error(`error in retriving mother babies in parent contoller: ${err}`);
    }
});
exports.getParentBabies = getParentBabies;
const getParentEBM = (page, username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (page == null || page == undefined) {
            return "page is required";
        }
        if (!Number.isInteger(page)) {
            return ("Page must be an integer.");
        }
        if (typeof username !== 'string' || !username.trim()) {
            return "username must be a non-empty string.";
        }
        const parentModel = new ParentsModel_1.ParentModel();
        const allEBMS = yield parentModel.SelectEBM(username, page);
        if (typeof allEBMS != "string") {
            return {
                Status: true,
                Data: allEBMS,
                Message: "Mother's EBM are retrieved Successfully"
            };
        }
        return {
            Status: true,
            Data: null,
            Message: allEBMS
        };
    }
    catch (err) {
        throw new Error(`error in retriving mother EBM in parent contoller: ${err}`);
    }
});
exports.getParentEBM = getParentEBM;
const getCalculations = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (typeof username !== 'string' || !username.trim()) {
            return "username must be a non-empty string.";
        }
        const parentModel = new ParentsModel_1.ParentModel();
        const calc = yield parentModel.Calculations(username);
        if (typeof calc != "string") {
            return {
                Status: true,
                Data: calc,
                Message: "Mother's calculations are retrieved Successfully"
            };
        }
        return {
            Status: true,
            Data: null,
            Message: calc
        };
    }
    catch (err) {
        throw new Error(`error in calculating mother statistics in parent contoller: ${err}`);
    }
});
exports.getCalculations = getCalculations;
const getProfile = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (typeof username !== 'string' || !username.trim()) {
            return {
                Status: false,
                Data: null,
                Message: "username must be a non-empty string."
            };
        }
        const parentModel = new ParentsModel_1.ParentModel();
        const user = yield parentModel.SelectUser(username);
        if (typeof user != "string") {
            return {
                Status: true,
                Data: user,
                Message: "User Profile is retrieved Successfully"
            };
        }
        return {
            Status: true,
            Data: null,
            Message: user
        };
    }
    catch (err) {
        throw new Error(`error in retriving user info in parent contoller: ${err}`);
    }
});
exports.getProfile = getProfile;
