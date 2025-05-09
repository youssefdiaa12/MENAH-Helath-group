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
exports.getHistory = exports.getBottleVerificationsFailed = exports.getBottleVerificationsSuccedd = exports.UnVerifyUser = exports.VerifyUser = exports.getUnverifiedParents = exports.getUnverifiedNurses = exports.getCalculations = void 0;
const AdminModel_1 = require("../../Models/Admins/AdminModel");
const getCalculations = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminModel = new AdminModel_1.AdminModel();
        const calculationnResponse = yield adminModel.calculate();
        if (calculationnResponse) {
            return {
                Status: true,
                Data: calculationnResponse,
                Message: "calculations retrieved Successfully"
            };
        }
        return {
            Status: false,
            Data: null,
            Message: "Error while Creating calculations"
        };
    }
    catch (err) {
        throw new Error(`error in Creating calculations in admin contoller: ${err}`);
    }
});
exports.getCalculations = getCalculations;
const getUnverifiedNurses = (page) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminModel = new AdminModel_1.AdminModel();
        const unverifiedUsersResponse = yield adminModel.selectUnVerifiedUsers(page);
        if (typeof unverifiedUsersResponse != "string") {
            return {
                Status: true,
                Data: unverifiedUsersResponse,
                Message: "unverified nurses are retrieved Successfully"
            };
        }
        return {
            Status: true,
            Data: null,
            Message: unverifiedUsersResponse
        };
    }
    catch (err) {
        throw new Error(`error in retriving unverified users in admin contoller: ${err}`);
    }
});
exports.getUnverifiedNurses = getUnverifiedNurses;
const getUnverifiedParents = (page) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (page == null || page == 0 || typeof page == 'string') {
            return {
                Status: true,
                Data: null,
                Message: "page Number is required"
            };
        }
        const adminModel = new AdminModel_1.AdminModel();
        const unverifiedUsersResponse = yield adminModel.selectUnVerifiedParents(page);
        if (typeof unverifiedUsersResponse != "string") {
            return {
                Status: true,
                Data: unverifiedUsersResponse,
                Message: "unverified parents are retrieved Successfully"
            };
        }
        return {
            Status: true,
            Data: null,
            Message: unverifiedUsersResponse
        };
    }
    catch (err) {
        throw new Error(`error in retriving unverified parents in admin contoller: ${err}`);
    }
});
exports.getUnverifiedParents = getUnverifiedParents;
const VerifyUser = (username, mobile) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (username == null || username == '' || typeof username != "string") {
            return "username is required";
        }
        if (mobile == null || mobile == '') {
            return "mobile is required";
        }
        if (mobile.length != 11) {
            return "mobile number must be 11 numbers";
        }
        if (typeof mobile != 'string') {
            return "mobile number must be 11 numbers as string";
        }
        const adminModel = new AdminModel_1.AdminModel();
        const response = yield adminModel.verifyUser(username, mobile);
        if (response) {
            return {
                Status: true,
                Data: response,
                Message: "user is verified Successfully"
            };
        }
        return {
            Status: true,
            Data: null,
            Message: response
        };
    }
    catch (err) {
        throw new Error(`error in verifying user in admin contoller: ${err}`);
    }
});
exports.VerifyUser = VerifyUser;
const UnVerifyUser = (username, mobile) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (username == null || username == '' || typeof username != "string") {
            return "username is required";
        }
        if (mobile == null || mobile == '') {
            return "mobile is required";
        }
        if (mobile.length != 11) {
            return "mobile number must be 11 numbers";
        }
        if (typeof mobile != 'string') {
            return "mobile number must be 11 numbers as string";
        }
        const adminModel = new AdminModel_1.AdminModel();
        const response = yield adminModel.DeclineUser(username, mobile);
        if (response) {
            return {
                Status: true,
                Data: response,
                Message: "user is not verified Successfully"
            };
        }
        return {
            Status: true,
            Data: null,
            Message: response
        };
    }
    catch (err) {
        throw new Error(`error in verifying user in admin contoller: ${err}`);
    }
});
exports.UnVerifyUser = UnVerifyUser;
const getBottleVerificationsSuccedd = (page) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (page == null || page == 0 || typeof page == 'string') {
            return {
                Status: true,
                Data: null,
                Message: "page Number is required"
            };
        }
        const adminModel = new AdminModel_1.AdminModel();
        const response = yield adminModel.getSuccessVerifications(page);
        if (typeof response != "string") {
            return {
                Status: true,
                Data: response,
                Message: "Succeed verifications are retrieved Successfully"
            };
        }
        return {
            Status: true,
            Data: null,
            Message: response
        };
    }
    catch (err) {
        throw new Error(`error in retriving Succeed verifications in admin contoller: ${err}`);
    }
});
exports.getBottleVerificationsSuccedd = getBottleVerificationsSuccedd;
const getBottleVerificationsFailed = (page) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (page == null || page == 0 || typeof page == 'string') {
            return {
                Status: true,
                Data: null,
                Message: "page Number is required"
            };
        }
        const adminModel = new AdminModel_1.AdminModel();
        const response = yield adminModel.getFailedVerifications(page);
        if (typeof response != "string") {
            return {
                Status: true,
                Data: response,
                Message: "Failed verifications are retrieved Successfully"
            };
        }
        return {
            Status: true,
            Data: null,
            Message: response
        };
    }
    catch (err) {
        throw new Error(`error in retriving failed verifications in admin contoller: ${err}`);
    }
});
exports.getBottleVerificationsFailed = getBottleVerificationsFailed;
const getHistory = (username, page) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (page == null || page == 0 || typeof page == 'string') {
            return {
                Status: true,
                Data: null,
                Message: "page Number is required"
            };
        }
        if (typeof username !== 'string' || !username.trim()) {
            return {
                Status: false,
                Data: null,
                Message: "username must be a non-empty string."
            };
        }
        const adminModel = new AdminModel_1.AdminModel();
        const response = yield adminModel.getLoggingHistory(username, page);
        if (typeof response != "string") {
            return {
                Status: true,
                Data: response,
                Message: "Login history is retrieved Successfully"
            };
        }
        return {
            Status: false,
            Data: null,
            Message: response
        };
    }
    catch (err) {
        throw new Error(`login history us retrival error in admin contoller: ${err}`);
    }
});
exports.getHistory = getHistory;
