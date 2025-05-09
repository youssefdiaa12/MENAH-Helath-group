import client from "../../utilies/database";
import {BabyInfo,parent_calculation} from "../../Types/Parents/ParentsType"
import {ebmInfo} from "../../Types/Nurse/EBMType"

export class ParentModel{
    async SelectBabies(mother_mrn:string,page:number): Promise<{ total: number, data: BabyInfo[] } | string>{
        try{
            const PAGE_SIZE = 5;
            const offset = (page - 1) * PAGE_SIZE;
            const connection = await client.connect();
            const SelectBabyQuery = `select * from public.baby where mother_id=($1) LIMIT $2 OFFSET $3`;
            const Baby = await connection.query(SelectBabyQuery,[mother_mrn,PAGE_SIZE,offset]);
            if(Baby.rows.length == 0){
                return "You have no babies in the system";
            }
            const usersLength = "select count(*) from baby where mother_id=($1)";
            const getLength = await connection.query(usersLength,[mother_mrn]);

            const total = parseInt(getLength.rows[0].count);
            return {
                total,
                data: Baby.rows
            };
        }
        catch(error){
            throw new Error(`baby selection error in parent models: ${error}`);
        }
    }
    async SelectEBM(mother_mrn:string,page:number): Promise<{ total: number, data: ebmInfo[] } | string>{
        try{
            const PAGE_SIZE = 5;
            const offset = (page - 1) * PAGE_SIZE;
            const connection = await client.connect();
            const SelectEBMQuery = `select * from public.bottle where mother_id=($1) LIMIT $2 OFFSET $3`;
            const EBM = await connection.query(SelectEBMQuery,[mother_mrn,PAGE_SIZE,offset]);
            if(EBM.rows.length == 0){
                return "You have no EBM in the system";
            }
            const usersLength = "select count(*) from bottle where mother_id=($1)";
            const getLength = await connection.query(usersLength,[mother_mrn]);

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
    async Calculations(mother_mrn:string): Promise<parent_calculation| string>{
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
            WHERE 
                mother_id = $1
            `;
            const calc = await connection.query(SelectQuery,[mother_mrn]);
            if(calc.rows.length == 0){
                return "No data in the system";
            }
            return calc.rows[0]
        }
        catch(error){
            throw new Error(`calculations error in parent models: ${error}`);
        }
    }
}