"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBabyInfo = validateBabyInfo;
function validateBabyInfo(data) {
    var _a, _b, _c, _d;
    // Validate babyName
    if (typeof data.babyName !== 'string' || !data.babyName.trim()) {
        return { isValid: false, message: "Baby name must be a non-empty string." };
    }
    // Validate gender
    if (data.gender !== "Male" && data.gender !== "Female") {
        return { isValid: false, message: "Gender must be 'Male' or 'Female'." };
    }
    // Validate MRN
    if (typeof data.mrn !== 'string' || !data.mrn.trim()) {
        return { isValid: false, message: "MRN must be a non-empty string." };
    }
    // Validate dateOfBirth (simple format check, not full date parsing)
    const dobRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dobRegex.test(data.dateOfBirth)) {
        return { isValid: false, message: "Date of Birth must be in DD/MM/YYYY format." };
    }
    // Validate daysOfLife
    if (typeof data.daysOfLife !== 'number' || data.daysOfLife < 0) {
        return { isValid: false, message: "Days of Life must be a non-negative number." };
    }
    // Validate birthWeightGrams
    if (typeof data.birthWeightGrams !== 'number' || data.birthWeightGrams <= 0) {
        return { isValid: false, message: "Birth Weight must be a positive number." };
    }
    // Validate gestationalAgeAtBirth
    if (typeof ((_a = data.gestationalAgeAtBirth) === null || _a === void 0 ? void 0 : _a.weeks) !== 'number' || data.gestationalAgeAtBirth.weeks < 0) {
        return { isValid: false, message: "Gestational age weeks must be a non-negative number." };
    }
    if (typeof ((_b = data.gestationalAgeAtBirth) === null || _b === void 0 ? void 0 : _b.days) !== 'number' || data.gestationalAgeAtBirth.days < 0 || data.gestationalAgeAtBirth.days > 6) {
        return { isValid: false, message: "Gestational age days must be between 0 and 6." };
    }
    // Validate correctedGestationalAge
    if (typeof ((_c = data.correctedGestationalAge) === null || _c === void 0 ? void 0 : _c.weeks) !== 'number' || data.correctedGestationalAge.weeks < 0) {
        return { isValid: false, message: "Corrected gestational age weeks must be a non-negative number." };
    }
    if (typeof ((_d = data.correctedGestationalAge) === null || _d === void 0 ? void 0 : _d.days) !== 'number' || data.correctedGestationalAge.days < 0 || data.correctedGestationalAge.days > 6) {
        return { isValid: false, message: "Corrected gestational age days must be between 0 and 6." };
    }
    // Validate birthCertificateNumber
    if (typeof data.birthCertificateNumber !== 'string' || !data.birthCertificateNumber.trim()) {
        return { isValid: false, message: "Birth Certificate Number must be a non-empty string." };
    }
    return { isValid: true, message: "All baby info fields are valid." };
}
