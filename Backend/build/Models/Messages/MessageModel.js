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
exports.MessageModel = void 0;
const database_1 = __importDefault(require("../../utilies/database"));
class MessageModel {
    Create(messInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const SelectUserQuery = `select * from public.users where id =($1) or id = ($2)`;
                const users = yield connection.query(SelectUserQuery, [messInfo.sender_id, messInfo.recipient_id]);
                if (users.rows.length != 2) {
                    return "sender or reciever is not found";
                }
                const EMPQuery = 'INSERT INTO public.messages (subject, body, sender_id, recipient_id) values ($1,$2,$3,$4) returning *';
                const EMPResponse = yield connection.query(EMPQuery, [messInfo.subject, messInfo.body, messInfo.sender_id, messInfo.recipient_id]);
                connection.release;
                return EMPResponse.rows[0];
            }
            catch (error) {
                throw new Error(`message creation error in message models: ${error}`);
            }
        });
    }
    SelectMeAsSender(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const SelectMessagesQuery = `select * from public.messages where sender_id = ($1)`;
                const messages = yield connection.query(SelectMessagesQuery, [id]);
                connection.release;
                if (messages.rows.length == 0) {
                    return "No Messages Found";
                }
                return messages.rows;
            }
            catch (error) {
                throw new Error(`message selection error in message models: ${error}`);
            }
        });
    }
    SelectMeAsReciever(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const SelectMessagesQuery = `select * from public.messages where recipient_id = ($1)`;
                const messages = yield connection.query(SelectMessagesQuery, [id]);
                connection.release;
                if (messages.rows.length == 0) {
                    return "No Messages Found";
                }
                return messages.rows;
            }
            catch (error) {
                throw new Error(`message selection error in message models: ${error}`);
            }
        });
    }
}
exports.MessageModel = MessageModel;
