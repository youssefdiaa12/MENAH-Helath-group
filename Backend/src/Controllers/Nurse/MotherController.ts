import {response} from "../../Types/Response";
import { motherinfo,validateMotherInfo } from "../../Types/Nurse/MotherType";
import {MotherModel} from "../../Models/Nurse/MotherModel";

export const AddMotherInfo = async (motherInfo:motherinfo ) :Promise<response|string> =>{
    try{
        const result =validateMotherInfo(motherInfo) 
        if(!result.isValid){
            return result.message
        }
        const motherModel = new MotherModel();
        const motherResponse = await motherModel.Create(motherInfo)
        if(typeof motherResponse != "string"){         
            return {
                Status:true,
                Data:motherResponse,
                Message: "Mother Info is added Successfully"
            } 
        }
        return {
            Status:false,
            Data:null,
            Message: motherResponse
        } 
    }
    catch(err){
        throw new Error(`error in adding mother info in mother contoller: ${err}`);
    }
}