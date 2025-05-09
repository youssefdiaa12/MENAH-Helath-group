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
exports.BabayModel = void 0;
const database_1 = __importDefault(require("../../utilies/database"));
class BabayModel {
    Create(babyData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const SelectBabyQuery = 'select personal_id from public.baby where personal_id=($1) or mrn=($2)';
                const alreadyRegisterdBaby = yield connection.query(SelectBabyQuery, [babyData.personal_id, babyData.mrn]);
                if (typeof alreadyRegisterdBaby.rows[0] === 'undefined') {
                    const check_mother = "select * from public.mother_info where user_id=($1)";
                    const check_mother_response = yield connection.query(check_mother, [babyData.mother_id]);
                    if (check_mother_response.rows.length == 0) {
                        return "mother of the baby does not exist";
                    }
                    const createBabyQuery = 'INSERT INTO public.baby (name_ar, name_en, mrn, visit_number, personal_id, birth_certificate_id, date_of_birth, recorded_at, days_of_life, gestationalAge_weeks, gestationalAge_days, gestationalAge, gender, birth_weight, mother_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14,$15) RETURNING *';
                    const BabyCreation = yield connection.query(createBabyQuery, [
                        babyData.name_ar,
                        babyData.name_en,
                        babyData.mrn,
                        babyData.visit_number,
                        babyData.personal_id,
                        babyData.birth_certificate_id,
                        babyData.date_of_birth,
                        babyData.recorded_at,
                        babyData.days_of_life,
                        babyData.gestational_age_weeks,
                        babyData.gestational_age_days,
                        babyData.gestational_age_total,
                        babyData.gender,
                        babyData.birth_weight,
                        check_mother_response.rows[0].mother_mrn
                    ]);
                    connection.release;
                    return BabyCreation.rows[0];
                }
                else {
                    return "MRN or Personal Id already exists";
                }
            }
            catch (error) {
                throw new Error(`baby creation error in baby models: ${error}`);
            }
        });
    }
    Select(searchValue, field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const SelectBabyQuery = `select * from public.baby where ${field}=($1)`;
                const Baby = yield connection.query(SelectBabyQuery, [searchValue]);
                if (typeof Baby.rows[0] === 'undefined') {
                    return null;
                }
                return Baby.rows[0];
            }
            catch (error) {
                throw new Error(`baby selection error in baby models: ${error}`);
            }
        });
    }
    UpdateVisitNumber(visitNum, mrn) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const UpdareBabyQuery = `update public.baby set visit_number = ($1) where mrn=($2)`;
                const updateResult = yield connection.query(UpdareBabyQuery, [visitNum, mrn]);
                if (updateResult.rowCount === 0) {
                    return null;
                }
                return 'Visit number updated successfully.';
            }
            catch (error) {
                throw new Error(`baby update visit number error in baby models: ${error}`);
            }
        });
    }
    SaveBabyPhoto(mrn, url, category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const SelectBabyQuery = 'select personal_id from public.baby where mrn=($1)';
                const alreadyRegisterdBaby = yield connection.query(SelectBabyQuery, [mrn]);
                if (typeof alreadyRegisterdBaby.rows[0] != 'undefined') {
                    const saveImageQuery = 'insert into public.babyImages (url,category,baby_id) values ($1,$2,$3) returning *';
                    const response = yield connection.query(saveImageQuery, [url, category, mrn]);
                    connection.release;
                    return response.rows[0];
                }
                else {
                    return null;
                }
            }
            catch (error) {
                throw new Error(`baby image saving error in baby models: ${error}`);
            }
        });
    }
}
exports.BabayModel = BabayModel;
