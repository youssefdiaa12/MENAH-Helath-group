export type BabyInfo = {
    babyName: string;
    gender: "Male" | "Female";
    mrn: string;
    dateOfBirth: string; // Format: DD/MM/YYYY
    daysOfLife: number;
    birthWeightGrams: number;
    gestationalAgeAtBirth: {
        weeks: number;
        days: number;
    };
    correctedGestationalAge: {
        weeks: number;
        days: number;
    };
    birthCertificateNumber: string;
};

export function validateBabyInfo(data: BabyInfo): { isValid: boolean; message: string } {
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
    if (typeof data.gestationalAgeAtBirth?.weeks !== 'number' || data.gestationalAgeAtBirth.weeks < 0) {
        return { isValid: false, message: "Gestational age weeks must be a non-negative number." };
    }
    if (typeof data.gestationalAgeAtBirth?.days !== 'number' || data.gestationalAgeAtBirth.days < 0 || data.gestationalAgeAtBirth.days > 6) {
        return { isValid: false, message: "Gestational age days must be between 0 and 6." };
    }

    // Validate correctedGestationalAge
    if (typeof data.correctedGestationalAge?.weeks !== 'number' || data.correctedGestationalAge.weeks < 0) {
        return { isValid: false, message: "Corrected gestational age weeks must be a non-negative number." };
    }
    if (typeof data.correctedGestationalAge?.days !== 'number' || data.correctedGestationalAge.days < 0 || data.correctedGestationalAge.days > 6) {
        return { isValid: false, message: "Corrected gestational age days must be between 0 and 6." };
    }

    // Validate birthCertificateNumber
    if (typeof data.birthCertificateNumber !== 'string' || !data.birthCertificateNumber.trim()) {
        return { isValid: false, message: "Birth Certificate Number must be a non-empty string." };
    }

    return { isValid: true, message: "All baby info fields are valid." };
}
