import {response} from "../../Types/Response";
import { adminInfo } from "../../Types/Admin/AdminType";
import {AdminModel} from "../../Models/Admins/AdminModel";


export const getCalculations = async () :Promise<response|string> =>{
    try{
        const adminModel = new AdminModel();
        const calculationnResponse = await adminModel.calculate()
        if(calculationnResponse){         
            return {
                Status:true,
                Data:calculationnResponse,
                Message: "calculations retrieved Successfully"
            } 
        }
        return {
            Status:false,
            Data:null,
            Message: "Error while Creating calculations"
        } 
    }
    catch(err){
        throw new Error(`error in Creating calculations in admin contoller: ${err}`);
    }
}

export const getUnverifiedNurses = async (page:number) :Promise<response|string> =>{
    try{
        const adminModel = new AdminModel();
        const unverifiedUsersResponse = await adminModel.selectUnVerifiedUsers(page)
        if(typeof unverifiedUsersResponse != "string"){         
            return {
                Status:true,
                Data:unverifiedUsersResponse,
                Message: "unverified nurses are retrieved Successfully"
            } 
        }
        return {
            Status:true,
            Data:null,
            Message: unverifiedUsersResponse
        } 
    }
    catch(err){
        throw new Error(`error in retriving unverified users in admin contoller: ${err}`);
    }
}

export const getUnverifiedParents = async (page:number) :Promise<response|string> =>{
    try{
        if(page == null || page == 0 || typeof page == 'string'){
            return {
                Status:true,
                Data:null,
                Message: "page Number is required"
            } 
        }
        const adminModel = new AdminModel();
        const unverifiedUsersResponse = await adminModel.selectUnVerifiedParents(page)
        if(unverifiedUsersResponse){         
            return {
                Status:true,
                Data:unverifiedUsersResponse,
                Message: "unverified parents are retrieved Successfully"
            } 
        }
        return {
            Status:true,
            Data:null,
            Message: unverifiedUsersResponse
        } 
    }
    catch(err){
        throw new Error(`error in retriving unverified parents in admin contoller: ${err}`);
    }
}

export const VerifyUser = async (username:string,mobile:string) :Promise<response|string> =>{
    try{
        if(username == null || username == '' || typeof username != "string"){
            return "username is required"
        }
        if(mobile == null || mobile == ''){
            return "mobile is required"
        }
        if(mobile.length != 11){
            return "mobile number must be 11 numbers"
        }
        if(typeof mobile != 'string'){
            return "mobile number must be 11 numbers as string"
        }
        const adminModel = new AdminModel();
        const response = await adminModel.verifyUser(username,mobile)
        if(response){         
            return {
                Status:true,
                Data:response,
                Message: "user is verified Successfully"
            } 
        }
        return {
            Status:true,
            Data:null,
            Message: response
        } 
    }
    catch(err){
        throw new Error(`error in verifying user in admin contoller: ${err}`);
    }
}
export const UnVerifyUser = async (username:string,mobile:string) :Promise<response|string> =>{
    try{
        if(username == null || username == '' || typeof username != "string"){
            return "username is required"
        }
        if(mobile == null || mobile == ''){
            return "mobile is required"
        }
        if(mobile.length != 11){
            return "mobile number must be 11 numbers"
        }
        if(typeof mobile != 'string'){
            return "mobile number must be 11 numbers as string"
        }
        const adminModel = new AdminModel();
        const response = await adminModel.DeclineUser(username,mobile)
        if(response){         
            return {
                Status:true,
                Data:response,
                Message: "user is not verified Successfully"
            } 
        }
        return {
            Status:true,
            Data:null,
            Message: response
        } 
    }
    catch(err){
        throw new Error(`error in verifying user in admin contoller: ${err}`);
    }
}


export const getBottleVerificationsSuccedd = async (page:number) :Promise<response|string> =>{
    try{
        if(page == null || page == 0 || typeof page == 'string'){
            return {
                Status:true,
                Data:null,
                Message: "page Number is required"
            } 
        }
        const adminModel = new AdminModel();
        const response = await adminModel.getSuccessVerifications(page)
        if(response){         
            return {
                Status:true,
                Data:response,
                Message: "Succeed verifications are retrieved Successfully"
            } 
        }
        return {
            Status:true,
            Data:null,
            Message: response
        } 
    }
    catch(err){
        throw new Error(`error in retriving Succeed verifications in admin contoller: ${err}`);
    }
}

export const getBottleVerificationsFailed = async (page:number) :Promise<response|string> =>{
    try{
        if(page == null || page == 0 || typeof page == 'string'){
            return {
                Status:true,
                Data:null,
                Message: "page Number is required"
            } 
        }
        const adminModel = new AdminModel();
        const response = await adminModel.getFailedVerifications(page)
        if(response){         
            return {
                Status:true,
                Data:response,
                Message: "Failed verifications are retrieved Successfully"
            } 
        }
        return {
            Status:true,
            Data:null,
            Message: response
        } 
    }
    catch(err){
        throw new Error(`error in retriving failed verifications in admin contoller: ${err}`);
    }
}


export const getHistory = async (user_id:number,page:number) :Promise<response|string> =>{
    try{
        if(page == null || page == 0 || typeof page == 'string'){
            return {
                Status:true,
                Data:null,
                Message: "page Number is required"
            } 
        }
        if(user_id==null || user_id==0){
            return {
                Status:true,
                Data:null,
                Message: "user id is required"
            }
        }
        const adminModel = new AdminModel();
        const response = await adminModel.getLoggingHistory(user_id,page)
        if(typeof response != "string"){         
            return {
                Status:true,
                Data:response,
                Message: "Login history is retrieved Successfully"
            } 
        }
        return {
            Status:false,
            Data:null,
            Message: response
        } 
    }
    catch(err){
        throw new Error(`login history us retrival error in admin contoller: ${err}`);
    }
}