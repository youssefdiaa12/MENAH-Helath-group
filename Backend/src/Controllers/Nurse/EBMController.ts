import {response} from "../../Types/Response"
import {ebmInfo,BottleUsageInfo} from "../../Types/Nurse/EBMType";
import {EBMModel} from "../../Models/Nurse/EBMModel"
import {verification} from "../../Types/Nurse/VerificationType"
import { stat } from "fs";


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

export const SelectBottle = async (id:string) =>{
    try{
        const ebmModel = new EBMModel();
        const ebmSearchResult = await ebmModel.SelectBottle(id)
        if(ebmSearchResult){
            return {
                Status:true,
                Data: ebmSearchResult,
                Message: "Bottle are retrieved successfully"
            } 
        }
        return {
            Status:false,
            Data:null,
            Message: "No Bottle not found!"
        } 
    }
    catch(err){
        throw new Error(`error in selecting bottles in ebm contoller: ${err}`);
    }
}
export const SelectBottleUsage = async () =>{
    try{
        const ebmModel = new EBMModel();
        const ebmSearchResult = await ebmModel.selectAllBottleUsage()
        if(ebmSearchResult){
            return {
                Status:true,
                Data: ebmSearchResult,
                Message: "Bottle Usage are retrieved successfully"
            } 
        }
        return {
            Status:false,
            Data:null,
            Message: "No Bottle Usage not found!"
        } 
    }
    catch(err){
        throw new Error(`error in selecting bottles usage in ebm contoller: ${err}`);
    }
}
export const UseBottle = async (info:BottleUsageInfo) =>{
    try{
        const ebmModel = new EBMModel();
        const ebmUsageResult = await ebmModel.CreateBottleUsage(info.bottle_id,info.total_volume,info.total_volume_used,info.total_volume_discarded,info.date_of_usage)
        if(ebmUsageResult){
            return {
                Status:true,
                Data: ebmUsageResult,
                Message: "Bottle Usage is done successfully"
            } 
        }
        return {
            Status:false,
            Data:null,
            Message: ebmUsageResult
        } 
    }
    catch(err){
        throw new Error(`error in subtracting bottles volume in ebm contoller: ${err}`);
    }
}

export const addVerification = async (info:verification) =>{
    try{
        const verificationModel = new EBMModel();
        const verificationResult = await verificationModel.AddVerification(info)
        if(typeof verificationResult != "string"){
            return {
                Status:true,
                Data: verificationResult,
                Message: "verification is added successfully"
            } 
        }
        return {
            Status:false,
            Data:null,
            Message: verificationResult
        } 
    }
    catch(err){
        throw new Error(`error in adding verification in ebm contoller: ${err}`);
    }
}

export const verify = async (id:number, value:boolean, second_nurse:number,status:string) =>{
    try{
        const validStatuses = ['completed','failed'];
        const validValue = [true,false]
        if (!validStatuses.includes(status)) {
            return {
                Status:false,
                Data:null,
                Message: 'Invalid status. Must be "completed" or "failed".'
            }        
        }
        if (!validValue.includes(value)) {
            return {
                Status:false,
                Data:null,
                Message: 'Invalid value. Must be true or false.'
            }        
        }
        if(id == null || value == null || second_nurse ==null || status == null){
            return {
                Status:false,
                Data:null,
                Message: 'Data is missing'
            } 
        }
        if((value == false && status != 'failed') || (value == true && status != 'completed')){
            return "value true is for status completed and value false is for status failed"
        }
        const verificationModel = new EBMModel();
        const verificationResult = await verificationModel.verify(id,value,second_nurse,status)
        if(typeof verificationResult != "string"){
            return {
                Status:true,
                Data: verificationResult,
                Message: "verification is updated successfully"
            } 
        }
        return {
            Status:false,
            Data:null,
            Message: verificationResult
        } 
    }
    catch(err){
        throw new Error(`error in updating verification in ebm contoller: ${err}`);
    }
}