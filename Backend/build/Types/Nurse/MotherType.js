"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMotherInfo = validateMotherInfo;
function validateMotherInfo(data) {
    var _a, _b, _c;
    if (!((_a = data.mother_name_en) === null || _a === void 0 ? void 0 : _a.trim())) {
        return { isValid: false, message: "Mother's English name is required." };
    }
    if (!((_b = data.mother_name_ar) === null || _b === void 0 ? void 0 : _b.trim())) {
        return { isValid: false, message: "Mother's Arabic name is required." };
    }
    if (data.mother_age === null || data.mother_age === undefined) {
        return { isValid: false, message: "Mother's age is required." };
    }
    if (data.mother_mrn === null || data.mother_mrn === undefined) {
        return { isValid: false, message: "Mother MRN is required." };
    }
    if (data.gravida === null || data.gravida === undefined) {
        return { isValid: false, message: "Gravida is required." };
    }
    if (data.para === null || data.para === undefined) {
        return { isValid: false, message: "Para is required." };
    }
    if (data.abortion === null || data.abortion === undefined) {
        return { isValid: false, message: "Abortion is required." };
    }
    if (!(data.date_of_delivery instanceof Date) || isNaN(data.date_of_delivery.getTime())) {
        return { isValid: false, message: "Valid delivery date is required." };
    }
    if (!((_c = data.type_of_delivery) === null || _c === void 0 ? void 0 : _c.trim())) {
        return { isValid: false, message: "Type of delivery is required." };
    }
    if (data.user_id === null || data.user_id === undefined) {
        return { isValid: false, message: "User ID is required." };
    }
    return { isValid: true, message: "All fields are valid." };
}
