import client from "../../utilies/database";
import {BabyInfo,parent_calculation} from "../../Types/Parents/ParentsType"
import {ebmInfo} from "../../Types/Nurse/EBMType"
import {userInfo} from "../../Types/Users/UsersType"


export class ParentModel{
    async SelectBabies(username:string): Promise<BabyInfo[]  | string>{
        try{

            const connection = await client.connect();
            const SelectBabyQuery = `select baby.name_en, baby.gender,baby.mrn,baby.date_of_birth,baby.days_of_life,
            baby.birth_weight, baby.gestationalage_days,baby.birth_certificate_id from public.baby baby
            inner join 	public.mother_info mother_info on baby.mother_id = mother_info.mother_mrn
            inner join public.users users on users.id = mother_info.user_id
            where users.username=($1)`;
            const Baby = await connection.query(SelectBabyQuery,[username]);
            if(Baby.rows.length == 0){
                return "You have no babies in the system";
            }
            return Baby.rows

        }
        catch(error){
            throw new Error(`baby selection error in parent models: ${error}`);
        }
    }
    async SelectEBM(username:string,page:number): Promise<{ total: number, data: ebmInfo[] } | string>{
        try{
            const PAGE_SIZE = 5;
            const offset = (page - 1) * PAGE_SIZE;
            const connection = await client.connect();
            const SelectEBMQuery = `select bottle.order_number,bottle.date_of_expression,bottle.date_of_delivery,
            bottle.volume, bottle.mother_id from public.bottle bottle
            inner join 	public.mother_info mother_info on bottle.mother_id = mother_info.mother_mrn
            inner join public.users users on users.id = mother_info.user_id
            where users.username=($1) LIMIT $2 OFFSET $3`;
            const EBM = await connection.query(SelectEBMQuery,[username,PAGE_SIZE,offset]);
            if(EBM.rows.length == 0){
                return "You have no EBM in the system";
            }
            const usersLength = `select count(*) from public.bottle bottle
            inner join 	public.mother_info mother_info on bottle.mother_id = mother_info.mother_mrn
            inner join public.users users on users.id = mother_info.user_id
            where users.username=($1)`;
            const getLength = await connection.query(usersLength,[username]);

            const total = parseInt(getLength.rows[0].count);
            return {
                total,
                data: EBM.rows
            };
        }
        catch(error){
            throw new Error(`ebm selection error in parent models: ${error}`);
        }
    }
    async Calculations(username:string): Promise<parent_calculation| string>{
        try{
            const connection = await client.connect();
            const SelectQuery = `
            SELECT 
            COUNT(*) AS number_bottles,
            SUM(volume) AS total_volume_available,
            COUNT(DISTINCT usage.bottle_id) AS total_bottles_used,
            SUM(CASE WHEN volume = 0 THEN 1 ELSE 0 END) AS total_bottles_finished,
            SUM(total_volume_used) AS total_volume_used,
            SUM(total_volume_discarded) AS total_volume_discarded
            FROM 
            public.bottle AS bottle
            LEFT JOIN 
            public.bottleusage AS usage 
            ON usage.bottle_id = bottle.order_number
            inner join 	public.mother_info mother_info on bottle.mother_id = mother_info.mother_mrn
            inner join public.users users on users.id = mother_info.user_id
            where users.username=($1)
            `;
            const calc = await connection.query(SelectQuery,[username]);
            if(calc.rows.length == 0){
                return "No data in the system";
            }
            return calc.rows[0]
        }
        catch(error){
            throw new Error(`calculations error in parent models: ${error}`);
        }
    }
    async SelectUser(username:string): Promise<userInfo| string>{
        try{
            const connection = await client.connect();
            const SelectUserQuery = `select id,username,firstname,lastname,mobile,profileimage,profiletype,isactive from public.users where username=($1) `;
            const user = await connection.query(SelectUserQuery,[username]);
            if(user.rows.length == 0){
                return "You have no account in the system";
            }

            return user.rows[0]
        }
        catch(error){
            throw new Error(`user profile error in parent models: ${error}`);
        }
    }

}