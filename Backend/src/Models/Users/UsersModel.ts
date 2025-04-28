import client from "../../utilies/database"
import {user} from "../../Types/Users/UsersType"


export class userModel{
    async Create(username:string, firstname:string, lastname:string, mobile:string, profileImage:string,password:string,profileType:string): Promise<user|null>{
        try{
            const connection = await client.connect();
            const selectUsersQuery = 'select username from public.users where username=($1) or mobile=($2)';
            const alreadyRegisterdUsers = await connection.query(selectUsersQuery, [username,mobile]);
            if(typeof alreadyRegisterdUsers.rows[0] === 'undefined'){
                const createUsersQuery = 'insert into public.users (username, firstname, lastname,mobile,profileImage,password,profileType) values($1,$2,$3,$4,$5,$6,$7) RETURNING *';
                const registeringUser = await connection.query(createUsersQuery,[username,firstname,lastname,mobile,profileImage,password,profileType]);
                connection.release;
                return registeringUser.rows[0]
            }
            else{
                return null;
            }
        }
        catch(error){
            throw new Error(`user creation error in user models: ${error}`);
        }
    }
    async Select(username:string): Promise<user|null>{
        try{
            const connection = await client.connect();
            const SelectUserQuery = 'select * from users where username=($1)';
            const loggedUser = await connection.query(SelectUserQuery,[username]);
            if(typeof loggedUser.rows[0] === 'undefined'){
                return null;
            }
            return loggedUser.rows[0];

        }
        catch(error){
            throw new Error(`user selection error in user models: ${error}`);
        }
    }
}