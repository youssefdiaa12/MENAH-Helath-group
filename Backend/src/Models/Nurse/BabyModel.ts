import {BabyInfo,babyImages} from "../../Types/Nurse/BabyType";
import client from "../../utilies/database";

export class BabayModel{
    async Create(babyData:BabyInfo): Promise<BabyInfo|string>{
        try{
            const connection = await client.connect();
            const SelectBabyQuery = 'select personal_id from public.baby where personal_id=($1) or mrn=($2)';
            const alreadyRegisterdBaby = await connection.query(SelectBabyQuery, [babyData.personal_id,babyData.mrn]);
            if(typeof alreadyRegisterdBaby.rows[0] === 'undefined'){
                const check_mother = "select * from public.mother_info where user_id=($1)"
                const check_mother_response = await connection.query(check_mother, [babyData.mother_id]);
                if(check_mother_response.rows.length == 0 ){
                    return "mother of the baby does not exist"
                }
                const createBabyQuery = 'INSERT INTO public.baby (name_ar, name_en, mrn, visit_number, personal_id, birth_certificate_id, date_of_birth, recorded_at, days_of_life, gestationalAge_weeks, gestationalAge_days, gestationalAge, gender, birth_weight, mother_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14,$15) RETURNING *';
                const BabyCreation = await connection.query(createBabyQuery,
                    [
                        babyData.name_ar,
                        babyData.name_en,
                        babyData.mrn,
                        babyData.visit_number,
                        babyData.personal_id,
                        babyData.birth_certificate_id,
                        babyData.date_of_birth,
                        babyData.recorded_at,
                        babyData.days_of_life,
                        babyData.gestational_age_weeks,
                        babyData.gestational_age_days,
                        babyData.gestational_age_total,
                        babyData.gender,
                        babyData.birth_weight,
                        check_mother_response.rows[0].mother_mrn
                    ]);
                connection.release;
                return BabyCreation.rows[0]
            }
            else{    
                return "MRN or Personal Id already exists";
            }
        }
        catch(error){
            throw new Error(`baby creation error in baby models: ${error}`);
        }
    }
    async Select(searchValue:string,field: string): Promise<BabyInfo|null>{
        try{
            const connection = await client.connect();
            const SelectBabyQuery = `select * from public.baby where ${field}=($1)`;
            const Baby = await connection.query(SelectBabyQuery,[searchValue]);
            if(typeof Baby.rows[0] === 'undefined'){
                return null;
            }
            return Baby.rows[0];

        }
        catch(error){
            throw new Error(`baby selection error in baby models: ${error}`);
        }
    }
    async UpdateVisitNumber(visitNum:number,mrn:string) : Promise<string|null>{
        try{
            const connection = await client.connect();
            const UpdareBabyQuery = `update public.baby set visit_number = ($1) where mrn=($2)`;
            const updateResult = await connection.query(UpdareBabyQuery,[visitNum,mrn]);
            if (updateResult.rowCount === 0) {
                return null;
            }
    
            return 'Visit number updated successfully.';

        }
        catch(error){
            throw new Error(`baby update visit number error in baby models: ${error}`);
        }
    }
    async SaveBabyPhoto(mrn:string,url:string,category:string): Promise<babyImages|null>{
        try{
            const connection = await client.connect();
            const SelectBabyQuery = 'select personal_id from public.baby where mrn=($1)';
            const alreadyRegisterdBaby = await connection.query(SelectBabyQuery, [mrn]);
            if(typeof alreadyRegisterdBaby.rows[0] != 'undefined'){
                const saveImageQuery = 'insert into public.babyImages (url,category,baby_id) values ($1,$2,$3) returning *'
                const response = await connection.query(saveImageQuery,[url,category,mrn]);
                connection.release;
                return response.rows[0]
            }
            else{    
                return null;
            }
        }
        catch(error){
            throw new Error(`baby image saving error in baby models: ${error}`);
        }
    }

    

}