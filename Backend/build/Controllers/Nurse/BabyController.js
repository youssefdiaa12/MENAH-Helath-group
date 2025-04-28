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
exports.SaveBabyPhoto = exports.UpdateBabyVisitNumber = exports.SearchBaby = exports.CreateBaby = void 0;
const BabyModel_1 = require("../../Models/Nurse/BabyModel");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const CreateBaby = (babyData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const babyModel = new BabyModel_1.BabayModel();
        const babyCreationResponse = yield babyModel.Create(babyData);
        console.log(babyCreationResponse);
        if (babyCreationResponse) {
            return {
                Status: true,
                Data: babyCreationResponse,
                Message: "Babay is Created Successfully"
            };
        }
        return {
            Status: false,
            Data: null,
            Message: "Baby Already Registered Before"
        };
    }
    catch (err) {
        throw new Error(`error in creating baby in baby contoller: ${err}`);
    }
});
exports.CreateBaby = CreateBaby;
const SearchBaby = (searchValue, searchField) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const babyModel = new BabyModel_1.BabayModel();
        const babySearchResult = yield babyModel.Select(searchValue, searchField);
        if (babySearchResult) {
            return {
                Status: true,
                Data: babySearchResult,
                Message: "Babay is found"
            };
        }
        return {
            Status: false,
            Data: null,
            Message: "Baby not found!"
        };
    }
    catch (err) {
        throw new Error(`error in searching baby in baby contoller: ${err}`);
    }
});
exports.SearchBaby = SearchBaby;
const UpdateBabyVisitNumber = (visitNumber, mrn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const babyModel = new BabyModel_1.BabayModel();
        const fetchBaby = yield babyModel.Select(mrn, "mrn");
        if (fetchBaby) {
            if (visitNumber == (Number(fetchBaby.visit_number) + 1)) {
                const babyUpdateResult = yield babyModel.UpdateVisitNumber(visitNumber, mrn);
                if (babyUpdateResult) {
                    return {
                        Status: true,
                        Data: { VisitNumber: visitNumber },
                        Message: "Babay visit number is updated successfully"
                    };
                }
            }
            else {
                return {
                    Status: false,
                    Data: { lastVisitNumber: fetchBaby.visit_number },
                    Message: "Baby visit number is invalid, it must increase 1 only"
                };
            }
        }
        return {
            Status: false,
            Data: null,
            Message: "Baby not found!"
        };
    }
    catch (err) {
        throw new Error(`error in updating baby visit number in baby contoller: ${err}`);
    }
});
exports.UpdateBabyVisitNumber = UpdateBabyVisitNumber;
const SaveBabyPhoto = (mrn, url, category) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const babyModel = new BabyModel_1.BabayModel();
        const babyPhotoSaving = yield babyModel.SaveBabyPhoto(mrn, url, category);
        if (babyPhotoSaving) {
            return {
                Status: true,
                Data: babyPhotoSaving,
                Message: `Babay ${category} photo is saved successfully`
            };
        }
        return {
            Status: false,
            Data: null,
            Message: "Baby not found!"
        };
    }
    catch (err) {
        throw new Error(`error in saving baby photo in baby contoller: ${err}`);
    }
});
exports.SaveBabyPhoto = SaveBabyPhoto;
