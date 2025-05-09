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
exports.AdminModel = void 0;
const database_1 = __importDefault(require("../../utilies/database"));
class AdminModel {
    calculate() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const usersCounter = `select sum(case when profiletype='nurse' then 1 else 0 end ) nurses,sum(case when profiletype='user' then 1 else 0 end ) parents from public.users users`;
                const users = yield connection.query(usersCounter);
                const babies = 'select count(baby.mrn) babies from public.baby';
                const babyExecute = yield connection.query(babies);
                const verifications = "select sum(case when verification.status = 'pending' then 1  else 0 end) pending,sum(case when verification.status = 'completed' then 1  else 0 end) complete,sum(case when verification.status = 'failed' then 1  else 0 end) failed from public.verifications verification";
                const verificationExecute = yield connection.query(verifications);
                connection.release;
                return {
                    "total_nurses": users.rows[0].nurses,
                    "total_parents": users.rows[0].parents,
                    "total_babies": babyExecute.rows[0].babies,
                    "pending_approvals": verificationExecute.rows[0].pending,
                    "total_success_verifications": verificationExecute.rows[0].complete,
                    "total_failed_verifications": verificationExecute.rows[0].failed
                };
            }
            catch (err) {
                throw new Error(`admin main panel calculation in admin models: ${err}`);
            }
        });
    }
    selectUnVerifiedUsers() {
        return __awaiter(this, arguments, void 0, function* (page = 1) {
            try {
                const PAGE_SIZE = 5;
                const offset = (page - 1) * PAGE_SIZE;
                const connection = yield database_1.default.connect();
                const getUsers = "select (firstname || ' ' || lastname) name, username,mobile  from users where  isactive = false and profiletype = 'nurse' LIMIT $1 OFFSET $2";
                const users = yield connection.query(getUsers, [PAGE_SIZE, offset]);
                const usersLength = "SELECT COUNT(*) FROM users WHERE isactive = false AND profiletype = 'nurse'";
                const getLength = yield connection.query(usersLength);
                const total = parseInt(getLength.rows[0].count);
                connection.release;
                if (users.rows.length == 0) {
                    return "no unverified nurses found";
                }
                return {
                    total,
                    data: users.rows
                };
            }
            catch (err) {
                throw new Error(`admin retriving unverified nurses in admin models: ${err}`);
            }
        });
    }
    selectUnVerifiedParents() {
        return __awaiter(this, arguments, void 0, function* (page = 1) {
            try {
                const PAGE_SIZE = 5;
                const offset = (page - 1) * PAGE_SIZE;
                const connection = yield database_1.default.connect();
                const getUsers = "select (firstname || ' ' || lastname) name, username,mobile  from users where  isactive = false and profiletype = 'user' LIMIT $1 OFFSET $2";
                const users = yield connection.query(getUsers, [PAGE_SIZE, offset]);
                const usersLength = "SELECT COUNT(*) FROM users WHERE isactive = false AND profiletype = 'nurse'";
                const getLength = yield connection.query(usersLength);
                const total = parseInt(getLength.rows[0].count);
                if (users.rows.length == 0) {
                    return "no unverified users found";
                }
                connection.release;
                return {
                    total,
                    data: users.rows
                };
            }
            catch (err) {
                throw new Error(`admin retriving unverified users in admin models: ${err}`);
            }
        });
    }
    verifyUser(username, mobile) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (mobile.length != 11) {
                    return "Phone Number Must Be 11 numbers";
                }
                const connection = yield database_1.default.connect();
                const getUsers = "select username from public.users where username=($1) and mobile=($2)";
                const users = yield connection.query(getUsers, [username, mobile]);
                if (users.rows.length == 0) {
                    return "This user is not found";
                }
                const verify = "update users set isactive=true where username=($1) and mobile=($2) returning username,firstname,lastname,mobile,isactive";
                const updating = yield connection.query(verify, [username, mobile]);
                return updating.rows[0];
            }
            catch (err) {
                throw new Error(`admin retriving unverified users in admin models: ${err}`);
            }
        });
    }
    DeclineUser(username, mobile) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (mobile.length != 11) {
                    return "Phone Number Must Be 11 numbers";
                }
                const connection = yield database_1.default.connect();
                const getUsers = "select username from public.users where username=($1) and mobile=($2)";
                const users = yield connection.query(getUsers, [username, mobile]);
                if (users.rows.length == 0) {
                    return "This user is not found";
                }
                const verify = "update users set isactive=false where username=($1) and mobile=($2) returning username,firstname,lastname,mobile,isactive";
                const updating = yield connection.query(verify, [username, mobile]);
                return updating.rows[0];
            }
            catch (err) {
                throw new Error(`admin retriving unverified users in admin models: ${err}`);
            }
        });
    }
    getSuccessVerifications() {
        return __awaiter(this, arguments, void 0, function* (page = 1) {
            try {
                const PAGE_SIZE = 5;
                const offset = (page - 1) * PAGE_SIZE;
                const connection = yield database_1.default.connect();
                const getVerifications = "select * from verifications where status = 'completed' LIMIT $1 OFFSET $2";
                const verifications = yield connection.query(getVerifications, [PAGE_SIZE, offset]);
                const usersLength = "select count(*) from verifications where status = 'completed'";
                const getLength = yield connection.query(usersLength);
                const total = parseInt(getLength.rows[0].count);
                if (verifications.rows.length == 0) {
                    return "Verifications are not found";
                }
                connection.release;
                return {
                    total,
                    data: verifications.rows
                };
            }
            catch (err) {
                throw new Error(`admin verifications success retrival error in admin models: ${err}`);
            }
        });
    }
    getFailedVerifications() {
        return __awaiter(this, arguments, void 0, function* (page = 1) {
            try {
                const PAGE_SIZE = 5;
                const offset = (page - 1) * PAGE_SIZE;
                const connection = yield database_1.default.connect();
                const getVerifications = "select * from verifications where status = 'failed' LIMIT $1 OFFSET $2";
                const verifications = yield connection.query(getVerifications, [PAGE_SIZE, offset]);
                const usersLength = "select count(*) from verifications where status = 'failed'";
                const getLength = yield connection.query(usersLength);
                const total = parseInt(getLength.rows[0].count);
                if (verifications.rows.length == 0) {
                    return "Verifications are not found";
                }
                connection.release;
                return {
                    total,
                    data: verifications.rows
                };
            }
            catch (err) {
                throw new Error(`admin verifications failed retrival error in admin models: ${err}`);
            }
        });
    }
    getLoggingHistory(user_id_1) {
        return __awaiter(this, arguments, void 0, function* (user_id, page = 1) {
            try {
                const PAGE_SIZE = 5;
                const offset = (page - 1) * PAGE_SIZE;
                const connection = yield database_1.default.connect();
                const getHistory = "select * from login_history where user_id = ($1) LIMIT $2 OFFSET $3";
                const history = yield connection.query(getHistory, [user_id, PAGE_SIZE, offset]);
                const usersLength = "select count(*) from login_history where user_id = ($1)";
                const getLength = yield connection.query(usersLength, [user_id]);
                const total = parseInt(getLength.rows[0].count);
                if (history.rows.length == 0) {
                    return "History are not found";
                }
                connection.release;
                return {
                    total,
                    data: history.rows
                };
            }
            catch (err) {
                throw new Error(`History retrival error in admin models: ${err}`);
            }
        });
    }
}
exports.AdminModel = AdminModel;
