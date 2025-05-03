import {response} from "../../Types/Response"
import {message} from "../../Types/message";
import {MessageModel} from "../../Models/Messages/MessageModel"



export const CreateMessage = async (MessData:message ) :Promise<response|string> =>{
    try{
        const MessModel = new MessageModel();
        const MessageCreationResponse = await MessModel.Create(MessData)
        if(typeof MessageCreationResponse != "string"){         
            return {
                Status:true,
                Data:MessageCreationResponse,
                Message: "Message is sent Successfully"
            } 
        }
        return {
            Status:false,
            Data:null,
            Message: MessageCreationResponse
        } 
    }
    catch(err){
        throw new Error(`error in Creating bottle in message contoller: ${err}`);
    }
}

export const SelectMySentMessages = async (id:number) =>{
    try{
        const MessModel = new MessageModel();
        const MessageSearchResponse = await MessModel.SelectMeAsSender(id)
        if(typeof MessageSearchResponse != "string"){
            return {
                Status:true,
                Data: MessageSearchResponse,
                Message: "Messages are retrieved successfully"
            } 
        }
        return {
            Status:false,
            Data:null,
            Message: MessageSearchResponse
        } 
    }
    catch(err){
        throw new Error(`error in selecting messages in message contoller: ${err}`);
    }
}

export const SelectMyrecieverMessages = async (id:number) =>{
    try{
        const MessModel = new MessageModel();
        const MessageSearchResponse = await MessModel.SelectMeAsReciever(id)
        if(typeof MessageSearchResponse != "string"){
            return {
                Status:true,
                Data: MessageSearchResponse,
                Message: "Messages are retrieved successfully"
            } 
        }
        return {
            Status:false,
            Data:null,
            Message: MessageSearchResponse
        } 
    }
    catch(err){
        throw new Error(`error in selecting messages in message contoller: ${err}`);
    }
}