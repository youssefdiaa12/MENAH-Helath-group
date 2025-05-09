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
exports.userModel = void 0;
const database_1 = __importDefault(require("../../utilies/database"));
class userModel {
    Create(username, firstname, lastname, mobile, profileImage, password, profileType) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const selectUsersQuery = 'select username from public.users where username=($1) or mobile=($2)';
                const alreadyRegisterdUsers = yield connection.query(selectUsersQuery, [username, mobile]);
                if (typeof alreadyRegisterdUsers.rows[0] === 'undefined') {
                    let createUsersQuery;
                    let registeringUser;
                    if (profileType == "admin") {
                        createUsersQuery = 'insert into public.users (username, firstname, lastname,mobile,profileImage,password,profileType,isactive) values($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *';
                        registeringUser = yield connection.query(createUsersQuery, [username, firstname, lastname, mobile, profileImage, password, profileType, true]);
                    }
                    else {
                        createUsersQuery = 'insert into public.users (username, firstname, lastname,mobile,profileImage,password,profileType) values($1,$2,$3,$4,$5,$6,$7) RETURNING *';
                        registeringUser = yield connection.query(createUsersQuery, [username, firstname, lastname, mobile, profileImage, password, profileType]);
                    }
                    connection.release;
                    return registeringUser.rows[0];
                }
                else {
                    return null;
                }
            }
            catch (error) {
                throw new Error(`user creation error in user models: ${error}`);
            }
        });
    }
    Select(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const SelectUserQuery = 'select * from users where username=($1)';
                const loggedUser = yield connection.query(SelectUserQuery, [username]);
                if (typeof loggedUser.rows[0] === 'undefined') {
                    return null;
                }
                const now = new Date();
                const loginDate = now.toISOString().split('T')[0]; // "YYYY-MM-DD"
                const loginTime = now.toTimeString().split(' ')[0]; // "HH:MM:SS"
                const loginHistory = 'insert into login_history(login_date,login_time,verification_result,user_id) values($1,$2,$3,$4)';
                yield connection.query(loginHistory, [loginDate, loginTime, "Login", loggedUser.rows[0].id]);
                return loggedUser.rows[0];
            }
            catch (error) {
                throw new Error(`user selection error in user models: ${error}`);
            }
        });
    }
    logout(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const SelectUserQuery = 'select * from users where username=($1)';
                const loggedUser = yield connection.query(SelectUserQuery, [username]);
                if (typeof loggedUser.rows[0] === 'undefined') {
                    return "user not found";
                }
                if (!loggedUser.rows[0].isactive) {
                    "your account is not activated yet";
                }
                const now = new Date();
                const loginDate = now.toISOString().split('T')[0]; // "YYYY-MM-DD"
                const loginTime = now.toTimeString().split(' ')[0]; // "HH:MM:SS"
                const loginHistory = 'insert into login_history(login_date,login_time,verification_result,user_id) values($1,$2,$3,$4)';
                yield connection.query(loginHistory, [loginDate, loginTime, "Logout", loggedUser.rows[0].id]);
                return loggedUser.rows[0];
            }
            catch (error) {
                throw new Error(`user logout error in user models: ${error}`);
            }
        });
    }
}
exports.userModel = userModel;
