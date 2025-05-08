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
exports.MotherModel = void 0;
const database_1 = __importDefault(require("../../utilies/database"));
class MotherModel {
    Create(mothetData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const SelectMotherQuery = `select * from public.users where id =($1) and isactive=true`;
                const mother = yield connection.query(SelectMotherQuery, [mothetData.user_id]);
                console.log(mother);
                if (mother.rows.length == 0) {
                    return "Mother Must be registered to the system first and her account is activated by the admin";
                }
                const duplicateMotherInfo = "select * from public.mother_info where user_id = ($1)";
                const duplicateResponse = yield connection.query(duplicateMotherInfo, [mothetData.user_id]);
                if (duplicateResponse.rows.length == 1) {
                    return "This Mother is already added by another Nurse.";
                }
                const InsertMotherQuery = 'INSERT INTO public.mother_info (mother_mrn, mother_name_en, mother_name_ar, mother_age,gravida,para, abortion, date_of_delivery, type_of_delivery,user_id) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) returning *';
                const Response = yield connection.query(InsertMotherQuery, [mothetData.mother_mrn, mothetData.mother_name_en, mothetData.mother_name_ar, mothetData.mother_age, mothetData.gravida, mothetData.para, mothetData.abortion, mothetData.date_of_delivery, mothetData.type_of_delivery, mothetData.user_id]);
                connection.release;
                return Response.rows[0];
            }
            catch (error) {
                throw new Error(`mother creation error in mother models: ${error}`);
            }
        });
    }
    Select(mother_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const SelectMotherQuery = `select * from public.users where id =($1) and isactive=true`;
                const mother = yield connection.query(SelectMotherQuery, [mother_id]);
                if (mother.rows.length == 0) {
                    return "Mother Must be registered to the system first and her account is activated by the admin";
                }
                const InsertMotherQuery = 'select * from public.mother_info where user_id=($1)';
                const Response = yield connection.query(InsertMotherQuery, [mother_id]);
                connection.release;
                return Response.rows[0];
            }
            catch (error) {
                throw new Error(`mother selection error in mother models: ${error}`);
            }
        });
    }
    SaveMotherPhoto(mrn, url, category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const SelectMotherQuery = 'select * from public.mother_info where mother_mrn=($1)';
                const alreadyRegisterdMother = yield connection.query(SelectMotherQuery, [mrn]);
                if (typeof alreadyRegisterdMother.rows[0] != 'undefined') {
                    const saveImageQuery = 'insert into public.motherImages (url,category,mother_id) values ($1,$2,$3) returning *';
                    const response = yield connection.query(saveImageQuery, [url, category, mrn]);
                    connection.release;
                    return response.rows[0];
                }
                else {
                    return null;
                }
            }
            catch (error) {
                throw new Error(`mother image saving error in mother models: ${error}`);
            }
        });
    }
}
exports.MotherModel = MotherModel;
