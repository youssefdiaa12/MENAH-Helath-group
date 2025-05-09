export type BabyInfo = {
    id?: number;
    name_ar: string;
    name_en: string;
    mrn: string;
    visit_number: number;
    personal_id: string;
    birth_certificate_id: string;
    date_of_birth: Date;
    recorded_at: Date;
    days_of_life: number;
    gestational_age_weeks: number;
    gestational_age_days: number;
    gestational_age_total: number; 
    gender: 'male' | 'female'; 
    birth_weight: string;
    mother_id: number | null; 
};

export type babyImages = {
    id :number,
    url :string,
    category :string,
    baby_id :string,
}

export function validateBabyInfo(data: BabyInfo): { isValid: boolean; message: string } {
    // Check string types and presence
    const englishNameRegex = /^[A-Za-z\s'-]+$/;  // Allows letters, spaces, hyphens, apostrophes
    const arabicNameRegex = /^[\u0600-\u06FF\s'-]+$/;  // Arabic Unicode range + space, hyphen, apostrophe

    if (typeof data.mrn != "string" || !data.mrn.trim()){
        return { isValid: false, message: "Baby's mrn must be a non-empty string." };

    }
    if(data.mrn.length != 12){
        return { isValid: false, message: "Baby's mrn must be string of length 12" };
    }
    if (typeof data.personal_id != "string" || !data.personal_id.trim()){
        return { isValid: false, message: "Baby's personal_id must be a non-empty string." };

    }
    
    if(data.personal_id.length != 12){
        return { isValid: false, message: "Baby's personal_id must be string of length 12" };
    }
    if (typeof data.birth_certificate_id != "string" || !data.birth_certificate_id.trim()){
        return { isValid: false, message: "Baby's birth_certificate_id must be a non-empty string." };

    }
    
    if(data.birth_certificate_id.length != 12){
        return { isValid: false, message: "Baby's birth_certificate_id must be string of length 12" };
    }

    if (typeof data.name_en !== 'string' || !data.name_en.trim()) {
        return { isValid: false, message: "Baby's English name must be a non-empty string." };
    }
    if (!englishNameRegex.test(data.name_en)) {
        return { isValid: false, message: "English name must not contain special characters or numbers." };
    }

    if (typeof data.name_ar !== 'string' || !data.name_ar.trim()) {
        return { isValid: false, message: "Baby's Arabic name must be a non-empty string." };
    }
    if (!arabicNameRegex.test(data.name_ar)) {
        return { isValid: false, message: "Arabic name must contain only Arabic letters and no special characters or numbers." };
    }

    if (typeof data.birth_weight !== 'string' || !data.birth_weight.trim()) {
        return { isValid: false, message: "Birth weight must be a non-empty string." };
    }
    if (!/^\d+$/.test(data.mrn)) {
        return { isValid: false, message: "MRN must contain only numeric characters." };
    }
    if (!/^\d+$/.test(data.personal_id)) {
        return { isValid: false, message: "Personal Id must contain only numeric characters." };
    }
    if (!/^\d+$/.test(data.birth_certificate_id)) {
        return { isValid: false, message: "Birth Certificate Id must contain only numeric characters." };
    }

    // Check number fields for null/undefined
    const numberFields: { value: any; name: string }[] = [
        { value: data.visit_number, name: "Visit number" },
        { value: data.birth_certificate_id, name: "Birth certificate ID" },
        { value: data.days_of_life, name: "Days of life" },
        { value: data.gestational_age_weeks, name: "Gestational age (weeks)" },
        { value: data.gestational_age_days, name: "Gestational age (days)" },
        { value: data.gestational_age_total, name: "Gestational age (total)" },
    ];

    for (const field of numberFields) {
        if (field.value === null || field.value === undefined) {
            return { isValid: false, message: `${field.name} is required.` };
        }
    }
    if (
        typeof data.days_of_life !== 'number' ||
        !Number.isInteger(data.days_of_life) ||
        data.days_of_life < 0
    ) {
        return { isValid: false, message: "Days of life must be a non-negative integer." };
    }

    // Check gender
    if (data.gender !== 'male' && data.gender !== 'female') {
        return { isValid: false, message: "Gender must be either 'male' or 'female'." };
    }
    if(data.gestational_age_weeks <20 || data.gestational_age_weeks>42){
        return { isValid: false, message: "GA must be between 20 and 42 weeks" };

    }

    // Validate dates
    const dob = new Date(data.date_of_birth);
    const recordedAt = new Date(data.recorded_at);

    if (isNaN(dob.getTime())) {
        return { isValid: false, message: "Valid date of birth is required." };
    }

    if (isNaN(recordedAt.getTime())) {
        return { isValid: false, message: "Valid recorded_at date is required." };
    }
    // Check if DOB is in the future
    const now = new Date();
    if (dob > now) {
        return { isValid: false, message: "Date of birth cannot be in the future." };
    }

    // mother_id can be null, but not undefined
    if (data.mother_id === undefined) {
        return { isValid: false, message: "Mother ID must be provided, even if null." };
    }

    return { isValid: true, message: "All fields are valid." };
}