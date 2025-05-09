import {ParentModel} from "../../Models/Parents/ParentsModel"
import {BabyInfo} from "../../Types/Parents/ParentsType"
import {ebmInfo} from "../../Types/Nurse/EBMType"
import {response} from "../../Types/Response";





export const getParentBabies = async (page:number,username:string) :Promise<response|string> =>{
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
        if (typeof username !== 'string' || !username.trim()) {
            return {
                Status:false,
                Data:null,
                Message:  "username must be a non-empty string."
            }
        }

        
        const parentModel = new ParentModel();
        const allbabies = await parentModel.SelectBabies(username,page)
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

export const getParentEBM = async (page:number,username:string) :Promise<response|string> =>{
    try{
        if(page == null || page ==undefined ){
            return "page is required"
        }
        if (!Number.isInteger(page)) {
            return("Page must be an integer.");
        }
        if (typeof username !== 'string' || !username.trim()) {
            return "username must be a non-empty string." ;
        }

        
        const parentModel = new ParentModel();
        const allEBMS = await parentModel.SelectEBM(username,page)
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

export const getCalculations= async (username:string) :Promise<response|string> =>{
    try{
        if (typeof username !== 'string' || !username.trim()) {
            return "username must be a non-empty string." ;
        }

        
        const parentModel = new ParentModel();
        const calc = await parentModel.Calculations(username)
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


export const getProfile = async (username:string) :Promise<response|string> =>{
    try{
        
        if (typeof username !== 'string' || !username.trim()) {
            return {
                Status:false,
                Data:null,
                Message: "username must be a non-empty string." 
            } 
        }

        
        const parentModel = new ParentModel();
        const user = await parentModel.SelectUser(username)
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
