import {ebmInfo,BottleUsageInfo} from "../../Types/Nurse/EBMType";
import client from "../../utilies/database";
import {verification} from "../../Types/Nurse/VerificationType"

export class EBMModel{
    async Create(ebmData:ebmInfo): Promise<ebmInfo|null>{
        try{
            const connection = await client.connect();
            const SelectbottleQuery = `select * from public.bottle where order_number =($1)`;
            const bottles = await connection.query(SelectbottleQuery,[ebmData.order]);
            if(bottles.rows.length > 0){
                return null;
            }
            const EMPQuery = 'INSERT INTO public.bottle (order_number, date_of_expression, date_of_delivery, volume,mother_id) values ($1,$2,$3,$4,$5) returning *';
            const EMPResponse = await connection.query(EMPQuery, [ebmData.order,ebmData.date_of_expression,ebmData.date_of_delivery,ebmData.volume, ebmData.mother_id ]);
            connection.release;
            return EMPResponse.rows[0]
        }
        catch(error){
            throw new Error(`ebm creation error in ebm models: ${error}`);
        }
    }
    async Select(): Promise<ebmInfo[]|null>{
        try{
            const connection = await client.connect();
            const SelectebmQuery = `select * from public.bottle`;
            const ebm = await connection.query(SelectebmQuery);
            connection.release;

            if(typeof ebm.rows === 'undefined'){
                return null;
            }
            return ebm.rows;

        }
        catch(error){
            throw new Error(`ebm selection error in ebm models: ${error}`);
        }
    }
    async SelectBottle(id:string): Promise<ebmInfo[]|null>{
        try{
            if (!id || id.trim() === '' || id.trim().toLowerCase() === 'null') {
                return null;
            }
            const connection = await client.connect();
            const SelectebmQuery = `select * from public.bottle where order_number =($1) or mother_id=($1)`;
            const ebm = await connection.query(SelectebmQuery,[id]);
            connection.release;

            if(typeof ebm.rows === 'undefined'){
                return null;
            }
            return ebm.rows;

        }
        catch(error){
            throw new Error(`ebm selection error in ebm models: ${error}`);
        }
    }
    async CreateBottleUsage(bottle_id:number,total_volume:number,total_volume_used:number,total_volume_discarded:number,date_of_usage:Date): Promise<BottleUsageInfo|string>{
        try{
            if (!bottle_id) {
                return "bottle id is required";
            }
            const connection = await client.connect();
            const SelectebmQuery = `select * from public.bottle where order_number =($1)`;
            const ebm = await connection.query(SelectebmQuery,[bottle_id]);
            if(ebm.rows.length == 0){
                return "this bottle is not found";
            }
            const volume = ebm.rows[0].volume
            if(total_volume != (total_volume_used+total_volume_discarded)){
                return "total volume is not equal used plus discarded milk"
            }
            if(volume < total_volume){
                return `this volume is not availabe, the available volume for this bottle is ${volume}`;
            }
            const insertUsageQuery = "insert into public.bottleusage (total_volume, total_volume_used, total_volume_discarded, date_of_usage, bottle_id) values ($1,$2,$3,$4,$5)";
            const usage = await connection.query(insertUsageQuery,[total_volume,total_volume_used,total_volume_discarded,date_of_usage,bottle_id]);
            const updateBottleQuery = `update public.bottle set volume=${volume-total_volume} where order_number=($1) returning *`
            const updateBottle = await connection.query(updateBottleQuery,[bottle_id]);
            connection.release;
            return updateBottle.rows[0];
        }
        catch(error){
            throw new Error(`ebm calculation error in ebm models: ${error}`);
        }
    }
    async AddVerification(verificationInfo:verification): Promise<verification|string>{
        try{
            const connection = await client.connect();
            const SelectUserQuery = `select * from public.users where id =($1) or id = ($2)`;
            const users = await connection.query(SelectUserQuery,[verificationInfo.first_nurse,verificationInfo.second_nurse]);
            if(users.rows.length != 2){
                return "first nurse or second nurse is not found";
            }
            const InsertVerificationQuery = `insert into verifications (bottle_id,baby_band_mrn,bottle_baby_mrn,first_nurse,second_nurse,isverified) values ($1,$2,$3,$4,$5,$6) returning *`;
            const verification = await connection.query(InsertVerificationQuery,[verificationInfo.bottle_id,verificationInfo.baby_band_mrn,verificationInfo.bottle_baby_mrn,verificationInfo.first_nurse,verificationInfo.second_nurse,verificationInfo.isverified]);
            connection.release;
            return verification.rows[0];
        }
        catch(error){
            throw new Error(`Verification Insertion error in ebm models: ${error}`);
        }
    }
    async verify(id:number, value:boolean, second_nurse:number,status:string): Promise<verification|string>{
        try{
            const connection = await client.connect();
            const SelectUserQuery = `select * from public.users where id =($1)`;
            const user = await connection.query(SelectUserQuery,[second_nurse]);
            if(user.rows.length != 1){
                return "second nurse is not found";
            }
            const UpdateVerificationQuery = `update public.verifications set status= ($1), isverified = ($2) where id=($3) returning *`;
            const verification = await connection.query(UpdateVerificationQuery,[status,value,id]);
            connection.release;
            return verification.rows[0];
        }
        catch(error){
            throw new Error(`Verification Insertion error in ebm models: ${error}`);
        }
    }

    


}
