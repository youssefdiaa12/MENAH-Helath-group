import {ebmInfo} from "../../Types/Nurse/EBMType";
import client from "../../utilies/database";


export class EBMModel{
    async Create(ebmData:ebmInfo): Promise<ebmInfo|null>{
        try{
            const connection = await client.connect();
            const EMPQuery = 'INSERT INTO public.bottle (order, date_of_expression, date_of_delivery, volume,mother_id) values ($1,$2,$3,$4,$5) returning *';
            const EMPResponse = await connection.query(EMPQuery, [ebmData.order,ebmData.date_of_expression,ebmData.date_of_delivery,ebmData.volume, ebmData.mother_id ]);
            connection.release;
            return EMPResponse.rows[0]
        }
        catch(error){
            throw new Error(`ebm creation error in ebm models: ${error}`);
        }
    }
    async Select(): Promise<ebmInfo|null>{
        try{
            const connection = await client.connect();
            const SelectebmQuery = `select * from public.bottle`;
            const ebm = await connection.query(SelectebmQuery);
            if(typeof ebm.rows[0] === 'undefined'){
                return null;
            }
            return ebm.rows[0];

        }
        catch(error){
            throw new Error(`ebm selection error in ebm models: ${error}`);
        }
    }

}
