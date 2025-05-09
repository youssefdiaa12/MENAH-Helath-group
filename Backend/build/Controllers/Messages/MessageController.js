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
exports.MarkAsRead = exports.SelectMyrecieverMessages = exports.SelectMySentMessages = exports.CreateMessage = void 0;
const message_1 = require("../../Types/message");
const MessageModel_1 = require("../../Models/Messages/MessageModel");
const CreateMessage = (MessData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = (0, message_1.validateMessage)(MessData);
        if (!result.isValid) {
            return {
                Status: false,
                Data: null,
                Message: result.message
            };
        }
        const MessModel = new MessageModel_1.MessageModel();
        const MessageCreationResponse = yield MessModel.Create(MessData);
        if (typeof MessageCreationResponse != "string") {
            return {
                Status: true,
                Data: MessageCreationResponse,
                Message: "Message is sent Successfully"
            };
        }
        return {
            Status: false,
            Data: null,
            Message: MessageCreationResponse
        };
    }
    catch (err) {
        throw new Error(`error in Creating bottle in message contoller: ${err}`);
    }
});
exports.CreateMessage = CreateMessage;
const SelectMySentMessages = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (id == null || id == undefined) {
            return {
                Status: false,
                Data: null,
                Message: "id is required"
            };
        }
        if (!Number.isInteger(id)) {
            return {
                Status: false,
                Data: null,
                Message: "id must be an integer."
            };
        }
        const MessModel = new MessageModel_1.MessageModel();
        const MessageSearchResponse = yield MessModel.SelectMeAsSender(id);
        if (typeof MessageSearchResponse != "string") {
            return {
                Status: true,
                Data: MessageSearchResponse,
                Message: "Messages are retrieved successfully"
            };
        }
        return {
            Status: false,
            Data: null,
            Message: MessageSearchResponse
        };
    }
    catch (err) {
        throw new Error(`error in selecting messages in message contoller: ${err}`);
    }
});
exports.SelectMySentMessages = SelectMySentMessages;
const SelectMyrecieverMessages = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (id == null || id == undefined) {
            return {
                Status: false,
                Data: null,
                Message: "id is required"
            };
        }
        if (!Number.isInteger(id)) {
            return {
                Status: false,
                Data: null,
                Message: "id must be an integer."
            };
        }
        const MessModel = new MessageModel_1.MessageModel();
        const MessageSearchResponse = yield MessModel.SelectMeAsReciever(id);
        if (typeof MessageSearchResponse != "string") {
            return {
                Status: true,
                Data: MessageSearchResponse,
                Message: "Messages are retrieved successfully"
            };
        }
        return {
            Status: false,
            Data: null,
            Message: MessageSearchResponse
        };
    }
    catch (err) {
        throw new Error(`error in selecting messages in message contoller: ${err}`);
    }
});
exports.SelectMyrecieverMessages = SelectMyrecieverMessages;
const MarkAsRead = (userId, messageId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (userId == null || userId == undefined) {
            return {
                Status: false,
                Data: null,
                Message: "userId is required"
            };
        }
        if (!Number.isInteger(userId)) {
            return {
                Status: false,
                Data: null,
                Message: "userId must be an integer."
            };
        }
        if (messageId == null || messageId == undefined) {
            return {
                Status: false,
                Data: null,
                Message: "messageId is required"
            };
        }
        if (!Number.isInteger(messageId)) {
            return {
                Status: false,
                Data: null,
                Message: "messageId must be an integer."
            };
        }
        const MessModel = new MessageModel_1.MessageModel();
        const MessageSearchResponse = yield MessModel.MarkAsRead(userId, messageId);
        if (typeof MessageSearchResponse != "string") {
            return {
                Status: true,
                Data: MessageSearchResponse,
                Message: "Message are updated successfully"
            };
        }
        return {
            Status: false,
            Data: null,
            Message: MessageSearchResponse
        };
    }
    catch (err) {
        throw new Error(`error in selecting messages in message contoller: ${err}`);
    }
});
exports.MarkAsRead = MarkAsRead;
