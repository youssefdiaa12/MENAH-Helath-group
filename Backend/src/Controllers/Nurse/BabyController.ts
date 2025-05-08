import {BabayModel} from "../../Models/Nurse/BabyModel"
import dotenv from "dotenv"
import {response} from "../../Types/Response"
import {BabyInfo,validateBabyInfo} from "../../Types/Nurse/BabyType";

dotenv.config();

export const CreateBaby = async (babyData:BabyInfo ) :Promise<response|string> =>{
    try{
        const result = validateBabyInfo(babyData)
        if(!result.isValid){
            return {
                Status:false,
                Data:null,
                Message: result.message
            } 
        }
        const babyModel = new BabayModel();
        const babyCreationResponse = await babyModel.Create(babyData)
        console.log(babyCreationResponse)
        if(typeof babyCreationResponse != "string"){         
            return {
                Status:true,
                Data:babyCreationResponse,
                Message: "Babay is Created Successfully"
            } 
        }
        return {
            Status:false,
            Data:null,
            Message: babyCreationResponse
        } 
    }
    catch(err){
        throw new Error(`error in creating baby in baby contoller: ${err}`);
    }
}

export const SearchBaby = async (searchValue:string, searchField:string) =>{
    try{
        if(searchField != "mrn" && searchField!="name_ar" && searchField!="name_en"){
            return {
                Status:false,
                Data:null,
                Message: "search value must be mrn or name_ar or name_en"
            }
        }
        if(typeof searchValue != "string" || !searchValue.trim()){
            return {
                Status:false,
                Data:null,
                Message: "search value must be non empty string"
            }  
        }
        if(typeof searchField != "string" || !searchField.trim()){
            return {
                Status:false,
                Data:null,
                Message: "search field must be non empty string"
            }  
        }
        const babyModel = new BabayModel();
        const babySearchResult = await babyModel.Select(searchValue,searchField)
        if(babySearchResult){
            return {
                Status:true,
                Data:babySearchResult,
                Message: "Babay is found"
            } 
        }
        return {
            Status:false,
            Data:null,
            Message: "Baby not found!"
        } 
    }
    catch(err){
        throw new Error(`error in searching baby in baby contoller: ${err}`);
    }
}
export const UpdateBabyVisitNumber = async (visitNumber:number, mrn:string) =>{
    try{
        if(visitNumber == null || visitNumber == undefined){
            return {
                Status:false,
                Data:null,
                Message: "visit number is required"
            }  
        }
        if (typeof mrn != "string" || !mrn.trim()){
            return {
                Status:false,
                Data:null,
                Message: "Baby's mrn must be a non-empty string." 
            }
    
        }
        if(mrn.length != 12){
            return {
                Status:false,
                Data:null,
                Message: "Baby's mrn must be string of length 12" 
            }
        }
    
        const babyModel = new BabayModel();
        const fetchBaby = await babyModel.Select(mrn,"mrn")
        if(fetchBaby){
            if(visitNumber == (Number(fetchBaby.visit_number) + 1)){
                const babyUpdateResult = await babyModel.UpdateVisitNumber(visitNumber,mrn)
                if(babyUpdateResult){
                    return {
                        Status:true,
                        Data:{VisitNumber: visitNumber},
                        Message: "Babay visit number is updated successfully"
                    } 
                }
            }
            else{
                return {
                    Status:false,
                    Data:{lastVisitNumber: fetchBaby.visit_number},
                    Message: "Baby visit number is invalid, it must increase 1 only"
                } 
            }
        }
        return {
            Status:false,
            Data:null,
            Message: "Baby not found!"
        } 
    }
    catch(err){
        throw new Error(`error in updating baby visit number in baby contoller: ${err}`);
    }
}

export const SaveBabyPhoto = async (mrn:string,url:string,category:string) =>{
    try{
        if (typeof mrn != "string" || !mrn.trim()){
            return { isValid: false, message: "Baby's mrn must be a non-empty string." };
    
        }
        if (mrn.length != 12){
            return { isValid: false, message: "Baby's mrn must be a non-empty string." };
    
        }
        if (typeof url != "string" || !url.trim()){
            return { isValid: false, message: "url must be a non-empty string." };
    
        }
        if (typeof category != "string" || !category.trim()){
            return { isValid: false, message: "category must be a non-empty string." };
    
        }
        if(mrn.length != 12){
            return { isValid: false, message: "Baby's mrn must be string of length 12" };
        }
        const babyModel = new BabayModel();
        const babyPhotoSaving = await babyModel.SaveBabyPhoto(mrn,url,category)
        if(babyPhotoSaving){
            return {
                Status:true,
                Data:babyPhotoSaving,
                Message: `Babay ${category} photo is saved successfully`
            } 
        }
        return {
            Status:false,
            Data:null,
            Message: "Baby not found!"
        } 
    }
    catch(err){
        throw new Error(`error in saving baby photo in baby contoller: ${err}`);
    }
}