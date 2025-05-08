import client from "../../utilies/database";
import {motherinfo} from "../../Types/Nurse/MotherType"



export class MotherModel{
    async Create(mothetData:motherinfo): Promise<motherinfo|string>{
        try{
            const connection = await client.connect();
            const SelectMotherQuery = `select * from public.users where id =($1) and isactive=true`;
            const mother = await connection.query(SelectMotherQuery,[mothetData.user_id]);
            console.log(mother)
            if(mother.rows.length == 0){
                return "Mother Must be registered to the system first and her account is activated by the admin";
            }
            const duplicateMotherInfo = "select * from public.mother_info where user_id = ($1)"
            const duplicateResponse = await connection.query(duplicateMotherInfo, [mothetData.user_id])
            if(duplicateResponse.rows.length == 1 ){
                return "This Mother is already added by another Nurse."
            }
            const InsertMotherQuery = 'INSERT INTO public.mother_info (mother_mrn, mother_name_en, mother_name_ar, mother_age,gravida,para, abortion, date_of_delivery, type_of_delivery,user_id) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) returning *';
            const Response = await connection.query(InsertMotherQuery, [mothetData.mother_mrn,mothetData.mother_name_en,mothetData.mother_name_ar,mothetData.mother_age, mothetData.gravida,mothetData.para, mothetData.abortion,mothetData.date_of_delivery,mothetData.type_of_delivery,mothetData.user_id ]);
            connection.release;
            return Response.rows[0]
        }
        catch(error){
            throw new Error(`mother creation error in mother models: ${error}`);
        }
    }
    async Select(mother_id:string): Promise<motherinfo|string>{
        try{
            const connection = await client.connect();
            const SelectMotherQuery = `select * from public.users where id =($1) and isactive=true`;
            const mother = await connection.query(SelectMotherQuery,[mother_id]);
            if(mother.rows.length == 0){
                return "Mother Must be registered to the system first and her account is activated by the admin";
            }
            const InsertMotherQuery = 'select * from public.mother_info where user_id=($1)';
            const Response = await connection.query(InsertMotherQuery, [mother_id]);
            connection.release;
            return Response.rows[0]
        }
        catch(error){
            throw new Error(`mother selection error in mother models: ${error}`);
        }
    }


}