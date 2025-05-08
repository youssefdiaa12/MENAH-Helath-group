"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateVerification = validateVerification;
function validateVerification(data) {
    // Validate number fields
    if (typeof data.baby_band_mrn != "string" || !data.baby_band_mrn.trim()) {
        return { isValid: false, message: "baby band mrn must be non empty string" };
    }
    if (data.baby_band_mrn.length != 12) {
        return { isValid: false, message: "baby band mrn must be string of length 12" };
    }
    const numberFields = [
        { value: data.bottle_id, name: "Bottle ID" },
        { value: data.first_nurse, name: "First nurse ID" },
        { value: data.second_nurse, name: "Second nurse ID" }
    ];
    for (const field of numberFields) {
        if (field.value === null || field.value === undefined || typeof field.value !== 'number') {
            return { isValid: false, message: `${field.name} must be a valid number.` };
        }
    }
    // Validate isverified as boolean
    if (typeof data.isverified !== 'boolean') {
        return { isValid: false, message: "'isverified' must be a boolean value (true or false)." };
    }
    return { isValid: true, message: "All fields are valid." };
}
