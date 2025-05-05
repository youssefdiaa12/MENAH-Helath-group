import {message} from "../../Types/message";
import client from "../../utilies/database";


export class MessageModel{
    async Create(messInfo:message): Promise<message|string>{
        try{
            const connection = await client.connect();
            const SelectUserQuery = `select * from public.users where id =($1) or id = ($2)`;
            const users = await connection.query(SelectUserQuery,[messInfo.sender_id,messInfo.recipient_id]);
            if(users.rows.length != 2){
                return "sender or reciever is not found";
            }
            const EMPQuery = 'INSERT INTO public.messages (subject, body, sender_id, recipient_id) values ($1,$2,$3,$4) returning *';
            const EMPResponse = await connection.query(EMPQuery, [messInfo.subject,messInfo.body,messInfo.sender_id,messInfo.recipient_id]);
            connection.release;
            return EMPResponse.rows[0]
        }
        catch(error){
            throw new Error(`message creation error in message models: ${error}`);
        }
    }
    async SelectMeAsSender(id:number): Promise<message[]|string>{
        try{
            const connection = await client.connect();
            const SelectMessagesQuery = `select * from public.messages where sender_id = ($1)`;
            const messages = await connection.query(SelectMessagesQuery,[id]);
            connection.release;

            if(messages.rows.length ==0){
                return "No Messages Found";
            }
            return messages.rows;

        }
        catch(error){
            throw new Error(`message selection error in message models: ${error}`);
        }
    }
    async MarkAsRead(userId:number,messageId:number): Promise<message|string>{
        try{
            const connection = await client.connect();
            const SelectMessagesQuery = `select * from public.messages where recipient_id = ($1) and id=($2)`;
            const messages = await connection.query(SelectMessagesQuery,[userId,messageId]);
            
            if(messages.rows.length ==0){
                return "No Messages found";
            }
            if(messages.rows[0].isread){
                return "Message is already read";
            }
            const updateMessage = `update public.messages set isread=true where recipient_id = ($1) and id=($2) returning *`;
            const updatedmessages = await connection.query(updateMessage,[userId,messageId]);
            connection.release;
            return updatedmessages.rows[0];
        }
        catch(error){
            throw new Error(`message updating error in message models: ${error}`);
        }
    }
    async SelectMeAsReciever(id:number): Promise<message[]|string>{
        try{
            const connection = await client.connect();
            const SelectMessagesQuery = `select * from public.messages where recipient_id = ($1)`;
            const messages = await connection.query(SelectMessagesQuery,[id]);
            connection.release;

            if(messages.rows.length ==0){
                return "No Messages Found";
            }
            return messages.rows;

        }
        catch(error){
            throw new Error(`message selection error in message models: ${error}`);
        }
    }

}
