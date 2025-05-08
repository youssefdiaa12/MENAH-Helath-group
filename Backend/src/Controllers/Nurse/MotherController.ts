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

export const SaveMotherPhoto = async (mrn:string,url:string,category:string) =>{
    try{
        if (typeof mrn != "string" || !mrn.trim()){
            return {
                Status:false,
                Data:null,
                Message: "Baby's mrn must be a non-empty string." 
            } 
    
        }
        if (mrn.length != 12){
            return {
                Status:false,
                Data:null,
                Message: "Baby's mrn must be a non-empty string."
            } 
    
        }
        if (typeof url != "string" || !url.trim()){
            return {
                Status:false,
                Data:null,
                Message:  "url must be a non-empty string." 
            }
    
        }
        if (typeof category != "string" || !category.trim()){
            return {
                Status:false,
                Data:null,
                Message:  "category must be a non-empty string." 
            }
    
        }
        if(mrn.length != 12){
            return {
                Status:false,
                Data:null,
                Message:  "Baby's mrn must be string of length 12"
            }
        }
        const motherModel = new MotherModel();
        const MotherPhotoSaving = await motherModel.SaveMotherPhoto(mrn,url,category)
        if(MotherPhotoSaving){
            return {
                Status:true,
                Data:MotherPhotoSaving,
                Message: `Mother ${category} photo is saved successfully`
            } 
        }
        return {
            Status:false,
            Data:null,
            Message: "Mother not found!"
        } 
    }
    catch(err){
        throw new Error(`error in saving Mother photo in mother contoller: ${err}`);
    }
}