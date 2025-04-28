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
exports.EBMModel = void 0;
const database_1 = __importDefault(require("../../utilies/database"));
class EBMModel {
    Create(ebmData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const EMPQuery = 'INSERT INTO public.bottle (order_number, date_of_expression, date_of_delivery, volume,mother_id) values ($1,$2,$3,$4,$5) returning *';
                const EMPResponse = yield connection.query(EMPQuery, [ebmData.order, ebmData.date_of_expression, ebmData.date_of_delivery, ebmData.volume, ebmData.mother_id]);
                connection.release;
                return EMPResponse.rows[0];
            }
            catch (error) {
                throw new Error(`ebm creation error in ebm models: ${error}`);
            }
        });
    }
    Select() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const SelectebmQuery = `select * from public.bottle`;
                const ebm = yield connection.query(SelectebmQuery);
                if (typeof ebm.rows === 'undefined') {
                    return null;
                }
                return ebm.rows;
            }
            catch (error) {
                throw new Error(`ebm selection error in ebm models: ${error}`);
            }
        });
    }
    SelectBottle(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const SelectebmQuery = `select * from public.bottle where order_number =($1) or mother_id=($1)`;
                const ebm = yield connection.query(SelectebmQuery, [id]);
                if (typeof ebm.rows === 'undefined') {
                    return null;
                }
                return ebm.rows;
            }
            catch (error) {
                throw new Error(`ebm selection error in ebm models: ${error}`);
            }
        });
    }
}
exports.EBMModel = EBMModel;
