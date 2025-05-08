export type motherinfo = {
    id? :number,
    mother_name_en :string,
    mother_name_ar :string,
    mother_age :number,
    mother_mrn :string,
    gravida :number,
    para :number,
    abortion :number,
    date_of_delivery :Date,
    type_of_delivery :string,
    user_id :number
}
const allowedTypes = [
    "Normal Vaginal Delivery (NVD)",
    "Assisted Vaginal Delivery (AVD)",
    "Emergency C-Section",
    "Elective C-Section"
] as const;
export function validateMotherInfo(data: motherinfo): { isValid: boolean, message: string } {
    const deliveryDate = new Date(data.date_of_delivery);
    if(typeof data.mother_mrn != 'string'){
        return { isValid: false, message: "Mother's mrn name must be string." };
    }
    if(data.mother_mrn.length != 12){
        return { isValid: false, message: "Mother's mrn name must be string of 12 numbers or chars" };

    }
    if(typeof data.mother_name_en != 'string'){
        return { isValid: false, message: "Mother's English name must be string." };
    }
    if(typeof data.mother_name_ar != 'string'){
        return { isValid: false, message: "Mother's Arabic name must be string." };
    }
    if(typeof data.type_of_delivery != 'string'){
        return { isValid: false, message: "Type of delivery must be string." };
    }
    if (!data.mother_name_en?.trim()) {
        return { isValid: false, message: "Mother's English name is required." };
    }
    if (!data.mother_name_ar?.trim()) {
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
    if (isNaN(deliveryDate.getTime())) {
        return { isValid: false, message: "Valid delivery date is required." };
    }
    if(data.type_of_delivery != "Normal Vaginal Delivery (NVD)" && data.type_of_delivery != "Assisted Vaginal Delivery (AVD)" && data.type_of_delivery !="Emergency C-Section" && data.type_of_delivery!= "Elective C-Section") {
        return {
            isValid: false,
            message: `Invalid type_of_delivery. Must be one of: ${allowedTypes.join(", ")}.`
        };
    }
    
    if (!data.type_of_delivery?.trim()) {
        return { isValid: false, message: "Type of delivery is required." };
    }
    if (data.user_id === null || data.user_id === undefined) {
        return { isValid: false, message: "User ID is required." };
    }

    return { isValid: true, message: "All fields are valid." };
}