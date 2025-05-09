import {ParentModel} from "../../Models/Parents/ParentsModel"
import {BabyInfo} from "../../Types/Parents/ParentsType"
import {ebmInfo} from "../../Types/Nurse/EBMType"
import {response} from "../../Types/Response";





export const getParentBabies = async (page:number,mother_mrn:string) :Promise<response|string> =>{
    try{
        if(page == null || page ==undefined ){
            return {
                Status:false,
                Data:null,
                Message: "page is required"
            } 
        }
        if (!Number.isInteger(page)) {
            return {
                Status:false,
                Data:null,
                Message: "Page must be an integer."
            } 
        }
        if (typeof mother_mrn !== 'string' || !mother_mrn.trim()) {
            return {
                Status:false,
                Data:null,
                Message:  "mother mrn must be a non-empty string."
            }
        }
        if(mother_mrn.length != 12){
            return {
                Status:false,
                Data:null,
                Message:  "mother mrn must be 12 characters"
            }
        }
        
        const parentModel = new ParentModel();
        const allbabies = await parentModel.SelectBabies(mother_mrn,page)
        if(typeof allbabies != "string"){         
            return {
                Status:true,
                Data:allbabies,
                Message: "Mother's Babies are retrieved Successfully"
            } 
        }
        return {
            Status:false,
            Data:null,
            Message: allbabies
        } 
    }
    catch(err){
        throw new Error(`error in retriving mother babies in parent contoller: ${err}`);
    }
}

export const getParentEBM = async (page:number,mother_mrn:string) :Promise<response|string> =>{
    try{
        if(page == null || page ==undefined ){
            return "page is required"
        }
        if (!Number.isInteger(page)) {
            return("Page must be an integer.");
        }
        if (typeof mother_mrn !== 'string' || !mother_mrn.trim()) {
            return "mother mrn must be a non-empty string." ;
        }
        if(mother_mrn.length != 12){
            return "mother mrn must be 12 characters"
        }
        
        const parentModel = new ParentModel();
        const allEBMS = await parentModel.SelectEBM(mother_mrn,page)
        if(typeof allEBMS != "string"){         
            return {
                Status:true,
                Data:allEBMS,
                Message: "Mother's EBM are retrieved Successfully"
            } 
        }
        return {
            Status:false,
            Data:null,
            Message: allEBMS
        } 
    }
    catch(err){
        throw new Error(`error in retriving mother EBM in parent contoller: ${err}`);
    }
}

export const getCalculations= async (mother_mrn:string) :Promise<response|string> =>{
    try{
        if (typeof mother_mrn !== 'string' || !mother_mrn.trim()) {
            return "mother mrn must be a non-empty string." ;
        }
        if(mother_mrn.length != 12){
            return "mother mrn must be 12 characters"
        }
        
        const parentModel = new ParentModel();
        const calc = await parentModel.Calculations(mother_mrn)
        if(typeof calc != "string"){         
            return {
                Status:true,
                Data:calc,
                Message: "Mother's calculations are retrieved Successfully"
            } 
        }
        return {
            Status:false,
            Data:null,
            Message: calc
        } 
    }
    catch(err){
        throw new Error(`error in calculating mother statistics in parent contoller: ${err}`);
    }
}


export const getProfile = async (user_id:string) :Promise<response|string> =>{
    try{
        
        if (typeof user_id !== 'string' || !user_id.trim()) {
            return {
                Status:false,
                Data:null,
                Message: "User id must be a non-empty string." 
            } 
        }

        
        const parentModel = new ParentModel();
        const user = await parentModel.SelectUser(user_id)
        if(typeof user != "string"){         
            return {
                Status:true,
                Data:user,
                Message: "User Profile is retrieved Successfully"
            } 
        }
        return {
            Status:false,
            Data:null,
            Message: user
        } 
    }
    catch(err){
        throw new Error(`error in retriving user info in parent contoller: ${err}`);
    }
}
