import dotenv from "dotenv"
import {response} from "../../Types/Response"
import {ebmInfo} from "../../Types/Nurse/EBMType";
import {EBMModel} from "../../Models/Nurse/EBMModel"


export const CreateBottle = async (EBMData:ebmInfo ) :Promise<response|string> =>{
    try{
        const ebmModel = new EBMModel();
        const ebmCreationResponse = await ebmModel.Create(EBMData)
        if(ebmCreationResponse){         
            return {
                Status:true,
                Data:ebmCreationResponse,
                Message: "Bottle is Created Successfully"
            } 
        }
        return {
            Status:false,
            Data:null,
            Message: "Error while Creating bottle"
        } 
    }
    catch(err){
        throw new Error(`error in Creating bottle in ebm contoller: ${err}`);
    }
}

export const SelectAllBottles = async () =>{
    try{
        const ebmModel = new EBMModel();
        const ebmSearchResult = await ebmModel.Select()
        if(ebmSearchResult){
            return {
                Status:true,
                Data: ebmSearchResult,
                Message: "Bottles are retrieved successfully"
            } 
        }
        return {
            Status:false,
            Data:null,
            Message: "No Bottles not found!"
        } 
    }
    catch(err){
        throw new Error(`error in selecting bottles in ebm contoller: ${err}`);
    }
}

