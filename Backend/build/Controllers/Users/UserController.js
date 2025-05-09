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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggUserout = exports.LogginUserIn = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const UsersModel_1 = require("../../Models/Users/UsersModel");
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const hashThePass = (password) => {
    try {
        return bcrypt_1.default.hashSync(password + process.env.PEPPER, parseInt(process.env.SALT_ROUNDS));
    }
    catch (err) {
        throw new Error(`hasshing password in controller: ${err}`);
    }
};
const createToken = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newtoken = jsonwebtoken_1.default.sign({ id: userInfo.id, username: userInfo.username, firstname: userInfo.firstname, lastname: userInfo.lastname, role: userInfo.profiletype, isActive: userInfo.isactive }, process.env.TOKENSECRET);
        return newtoken;
    }
    catch (err) {
        throw new Error(`Error creating User Token: ${err}`);
    }
});
const createUser = (username, firstname, lastname, mobile, profileImage, password, profileType) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()[\]{}\-_=+<>])[A-Za-z\d@$!%*?&#^()[\]{}\-_=+<>]{8,}$/;
        const usernameRegex = /^[A-Za-z_#-][A-Za-z0-9_#-]*$/;
        if (firstname.length > 49) {
            return {
                Status: false,
                Data: null,
                Message: "first name allowed length is 49"
            };
        }
        if (lastname.length > 49) {
            return {
                Status: false,
                Data: null,
                Message: "last name allowed length is 49"
            };
        }
        if (mobile.length != 11) {
            return {
                Status: false,
                Data: null,
                Message: "Mobile must be 11 numbers"
            };
        }
        if (!/^\d+$/.test(mobile)) {
            return {
                Status: false,
                Data: null,
                Message: "Mobile must contain only numeric characters"
            };
        }
        if (typeof password !== 'string' || !password.trim()) {
            return {
                Status: false,
                Data: null,
                Message: "Password must be a non-empty string"
            };
        }
        if (!strongPasswordRegex.test(password)) {
            return {
                Status: false,
                Data: null,
                Message: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
            };
        }
        if (typeof username !== 'string' || !username.trim()) {
            return {
                Status: false,
                Data: null,
                Message: "Username must be a non-empty string."
            };
        }
        // Must not be all digits
        if (/^\d+$/.test(username)) {
            return {
                Status: false,
                Data: null,
                Message: "Username must not consist of only numbers."
            };
        }
        // No spaces allowed
        if (/\s/.test(username)) {
            return {
                Status: false,
                Data: null,
                Message: "Username must not contain spaces."
            };
        }
        if (!usernameRegex.test(username)) {
            return {
                Status: false,
                Data: null,
                Message: "Username must start with a letter and can contain only (# , _ , -) special characters"
            };
        }
        const hashedpassword = hashThePass(password);
        const usermodel = new UsersModel_1.userModel();
        const userRegisteredData = yield usermodel.Create(username, firstname, lastname, mobile, profileImage, hashedpassword, profileType);
        if (userRegisteredData) {
            let response = {
                id: userRegisteredData.id,
                username: userRegisteredData.username,
                firstname: userRegisteredData.firstname,
                lastname: userRegisteredData.lastname,
                mobile: userRegisteredData.mobile,
                profileimage: userRegisteredData.profileimage,
                profiletype: userRegisteredData.profiletype,
                isactive: userRegisteredData.isactive
            };
            return {
                Status: true,
                Data: response,
                Message: "User is Created Successfully, Please wait for admin to approve you."
            };
        }
        return {
            Status: false,
            Data: null,
            Message: "User Already Registered Before"
        };
    }
    catch (error) {
        throw new Error(`error in creating user account in user contoller: ${error}`);
    }
});
exports.createUser = createUser;
const LogginUserIn = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usermodel = new UsersModel_1.userModel();
        const result = yield usermodel.Select(username);
        if (result != null) {
            if (!result.isactive) {
                return {
                    Status: false,
                    Data: null,
                    Message: "Admin has not approved you yet, please wait"
                };
            }
            if (bcrypt_1.default.compareSync(password + process.env.PEPPER, result.password)) {
                const token = yield createToken(result);
                let response = {
                    id: result.id,
                    username: result.username,
                    firstname: result.firstname,
                    lastname: result.lastname,
                    mobile: result.mobile,
                    profileimage: result.profileimage,
                    profiletype: result.profiletype,
                    isactive: result.isactive,
                    token: token
                };
                return {
                    Status: true,
                    Data: response,
                    Message: "User Logged in Successfully"
                };
            }
            else {
                return {
                    Status: false,
                    Data: null,
                    Message: "Password is Incorrect"
                };
            }
        }
        return {
            Status: false,
            Data: null,
            Message: "User Not Found"
        };
    }
    catch (error) {
        throw new Error(`error in creating user account in user contoller: ${error}`);
    }
});
exports.LogginUserIn = LogginUserIn;
const LoggUserout = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (username == null || username == '') {
            return "username is required";
        }
        if (typeof username != "string") {
            return "username must be string";
        }
        const usermodel = new UsersModel_1.userModel();
        const result = yield usermodel.logout(username);
        if (typeof result != "string") {
            return {
                Status: true,
                Data: null,
                Message: "user logged out successfully"
            };
        }
        return {
            Status: false,
            Data: null,
            Message: result
        };
    }
    catch (error) {
        throw new Error(`error in loggin user out in user contoller: ${error}`);
    }
});
exports.LoggUserout = LoggUserout;
