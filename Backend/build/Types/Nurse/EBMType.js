"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEbmInfo = validateEbmInfo;
exports.validateBottleUsageInfo = validateBottleUsageInfo;
function validateEbmInfo(data) {
    // Validate 'order'
    if (data.order === null || data.order === undefined || typeof data.order !== 'number') {
        return { isValid: false, message: "'Order' must be a valid number." };
    }
    // Validate 'volume'
    if (data.volume === null || data.volume === undefined || typeof data.volume !== 'number' || data.volume == 0) {
        return { isValid: false, message: "'Volume' must be a valid number." };
    }
    // Validate 'mother_id'
    if (data.mother_id === null || data.mother_id === undefined || typeof data.mother_id !== 'number') {
        return { isValid: false, message: "'Mother ID' must be a valid number." };
    }
    // Parse and validate 'date_of_expression'
    const expressionDate = new Date(data.date_of_expression);
    if (isNaN(expressionDate.getTime())) {
        return { isValid: false, message: "'Date of expression' must be a valid date." };
    }
    // Parse and validate 'date_of_delivery'
    const deliveryDate = new Date(data.date_of_delivery);
    if (isNaN(deliveryDate.getTime())) {
        return { isValid: false, message: "'Date of delivery' must be a valid date." };
    }
    return { isValid: true, message: "All fields are valid." };
}
function validateBottleUsageInfo(data) {
    // Validate numeric fields
    const numberFields = [
        { value: data.total_volume, name: "Total volume" },
        { value: data.total_volume_used, name: "Total volume used" },
        { value: data.total_volume_discarded, name: "Total volume discarded" },
        { value: data.bottle_id, name: "Bottle ID" }
    ];
    for (const field of numberFields) {
        if (field.value === null || field.value === undefined || typeof field.value !== 'number') {
            return { isValid: false, message: `${field.name} must be a valid number.` };
        }
    }
    // Validate date_of_usage
    const usageDate = new Date(data.date_of_usage);
    if (isNaN(usageDate.getTime())) {
        return { isValid: false, message: "Date of usage must be a valid date." };
    }
    // Optional logic: used + discarded <= total
    const usedPlusDiscarded = data.total_volume_used + data.total_volume_discarded;
    if (usedPlusDiscarded > data.total_volume) {
        return {
            isValid: false,
            message: "Sum of used and discarded volume cannot exceed total volume."
        };
    }
    return { isValid: true, message: "All fields are valid." };
}
