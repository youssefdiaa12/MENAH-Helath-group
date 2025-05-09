import {response} from "../../Types/Response"
import {message,validateMessage} from "../../Types/message";
import {MessageModel} from "../../Models/Messages/MessageModel"



export const CreateMessage = async (MessData:message ) :Promise<response|string> =>{
    try{
        const result = validateMessage(MessData)
        if(!result.isValid){
            return {
                Status:false,
                Data:null,
                Message: result.message
            }  
        }
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
        if(id == null || id ==undefined ){
            return {
                Status:false,
                Data:null,
                Message: "id is required"
            } 
        }
        if (!Number.isInteger(id)) {
            return {
                Status:false,
                Data:null,
                Message: "id must be an integer."
            }
        }
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
        if(id == null || id ==undefined ){
            return {
                Status:false,
                Data:null,
                Message: "id is required"
            } 
        }
        if (!Number.isInteger(id)) {
            return {
                Status:false,
                Data:null,
                Message: "id must be an integer."
            }
        }
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

export const MarkAsRead = async (userId:number,messageId:number) =>{
    try{
        if(userId == null || userId ==undefined ){
            return {
                Status:false,
                Data:null,
                Message: "userId is required"
            } 
        }
        if (!Number.isInteger(userId)) {
            return {
                Status:false,
                Data:null,
                Message: "userId must be an integer."
            }
        }
        if(messageId == null || messageId ==undefined ){
            return {
                Status:false,
                Data:null,
                Message: "messageId is required"
            } 
        }
        if (!Number.isInteger(messageId)) {
            return {
                Status:false,
                Data:null,
                Message: "messageId must be an integer."
            }
        }

        const MessModel = new MessageModel();
        const MessageSearchResponse = await MessModel.MarkAsRead(userId,messageId)
        if(typeof MessageSearchResponse != "string"){
            return {
                Status:true,
                Data: MessageSearchResponse,
                Message: "Message are updated successfully"
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