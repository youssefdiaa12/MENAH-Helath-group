export type BabyInfo = {
    id?: number;
    name_ar: string;
    name_en: string;
    mrn: number;
    visit_number: number;
    personal_id: number;
    birth_certificate_id: number;
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