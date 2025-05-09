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
exports.ParentModel = void 0;
const database_1 = __importDefault(require("../../utilies/database"));
class ParentModel {
    SelectBabies(mother_mrn, page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const PAGE_SIZE = 5;
                const offset = (page - 1) * PAGE_SIZE;
                const connection = yield database_1.default.connect();
                const SelectBabyQuery = `select * from public.baby where mother_id=($1) LIMIT $2 OFFSET $3`;
                const Baby = yield connection.query(SelectBabyQuery, [mother_mrn, PAGE_SIZE, offset]);
                if (Baby.rows.length == 0) {
                    return "You have no babies in the system";
                }
                const usersLength = "select count(*) from baby where mother_id=($1)";
                const getLength = yield connection.query(usersLength, [mother_mrn]);
                const total = parseInt(getLength.rows[0].count);
                return {
                    total,
                    data: Baby.rows
                };
            }
            catch (error) {
                throw new Error(`baby selection error in parent models: ${error}`);
            }
        });
    }
    SelectEBM(mother_mrn, page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const PAGE_SIZE = 5;
                const offset = (page - 1) * PAGE_SIZE;
                const connection = yield database_1.default.connect();
                const SelectEBMQuery = `select * from public.bottle where mother_id=($1) LIMIT $2 OFFSET $3`;
                const EBM = yield connection.query(SelectEBMQuery, [mother_mrn, PAGE_SIZE, offset]);
                if (EBM.rows.length == 0) {
                    return "You have no EBM in the system";
                }
                const usersLength = "select count(*) from bottle where mother_id=($1)";
                const getLength = yield connection.query(usersLength, [mother_mrn]);
                const total = parseInt(getLength.rows[0].count);
                return {
                    total,
                    data: EBM.rows
                };
            }
            catch (error) {
                throw new Error(`ebm selection error in parent models: ${error}`);
            }
        });
    }
    Calculations(mother_mrn) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const SelectQuery = `
            SELECT 
                COUNT(*) AS number_bottles,
                SUM(volume) AS total_volume_available,
                COUNT(DISTINCT usage.bottle_id) AS total_bottles_used,
                SUM(CASE WHEN volume = 0 THEN 1 ELSE 0 END) AS total_bottles_finished,
                SUM(total_volume_used) AS total_volume_used,
                SUM(total_volume_discarded) AS total_volume_discarded
            FROM 
                public.bottle AS bottle
            LEFT JOIN 
                public.bottleusage AS usage 
                ON usage.bottle_id = bottle.order_number
            WHERE 
                mother_id = $1
            `;
                const calc = yield connection.query(SelectQuery, [mother_mrn]);
                if (calc.rows.length == 0) {
                    return "No data in the system";
                }
                return calc.rows[0];
            }
            catch (error) {
                throw new Error(`calculations error in parent models: ${error}`);
            }
        });
    }
}
exports.ParentModel = ParentModel;
