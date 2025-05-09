export type message = {
    id?: number,
    subject:string,
    body :string,
    sender_id :number,
    recipient_id :number
}


export function validateMessage(data: message): { isValid: boolean; message: string } {
    // Validate subject
    if (typeof data.subject !== "string" || !data.subject.trim()) {
        return { isValid: false, message: "Subject must be a non-empty string." };
    }

    // Validate body
    if (typeof data.body !== "string" || !data.body.trim()) {
        return { isValid: false, message: "Body must be a non-empty string." };
    }

    // Validate sender_id
    if (typeof data.sender_id !== "number" || !Number.isInteger(data.sender_id) || data.sender_id <= 0) {
        return { isValid: false, message: "Sender ID must be a positive integer." };
    }

    // Validate recipient_id
    if (typeof data.recipient_id !== "number" || !Number.isInteger(data.recipient_id) || data.recipient_id <= 0) {
        return { isValid: false, message: "Recipient ID must be a positive integer." };
    }

    // Optional: validate id if present
    if (data.id !== undefined && (!Number.isInteger(data.id) || data.id < 0)) {
        return { isValid: false, message: "ID must be a non-negative integer." };
    }

    return { isValid: true, message: "All message fields are valid." };
}