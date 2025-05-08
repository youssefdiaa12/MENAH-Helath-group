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
            const now = new Date();
            const loginDate = now.toISOString().split('T')[0]; // "YYYY-MM-DD"
            const loginTime = now.toTimeString().split(' ')[0]; // "HH:MM:SS"
            const loginHistory = 'insert into login_history(login_date,login_time,verification_result,user_id) values($1,$2,$3,$4)'
            await connection.query(loginHistory,[loginDate,loginTime,"Login",loggedUser.rows[0].id]);
            return loggedUser.rows[0];

        }
        catch(error){
            throw new Error(`user selection error in user models: ${error}`);
        }
    }
    async logout(username:string): Promise<user|string>{
        try{
            const connection = await client.connect();
            const SelectUserQuery = 'select * from users where username=($1)';
            const loggedUser = await connection.query(SelectUserQuery,[username]);
            if(typeof loggedUser.rows[0] === 'undefined'){
                return "user not found";
            }
            if(!loggedUser.rows[0].isactive){
                "your account is not activated yet"
            }
            const now = new Date();
            const loginDate = now.toISOString().split('T')[0]; // "YYYY-MM-DD"
            const loginTime = now.toTimeString().split(' ')[0]; // "HH:MM:SS"
            const loginHistory = 'insert into login_history(login_date,login_time,verification_result,user_id) values($1,$2,$3,$4)'
            await connection.query(loginHistory,[loginDate,loginTime,"Logout",loggedUser.rows[0].id]);
            return loggedUser.rows[0];

        }
        catch(error){
            throw new Error(`user logout error in user models: ${error}`);
        }
    }
}