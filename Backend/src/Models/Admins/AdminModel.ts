import client from "../../utilies/database";
import {adminInfo,UserInfo} from "../../Types/Admin/AdminType";
import {history} from "../../Types/HistoryType"

export class AdminModel{
    async calculate(): Promise<adminInfo|null>{
        try{
            const connection = await client.connect();
            const usersCounter = `select sum(case when profiletype='nurse' then 1 else 0 end ) nurses,sum(case when profiletype='user' then 1 else 0 end ) parents from public.users users`;
            const users = await connection.query(usersCounter);
            
            const babies = 'select count(baby.mrn) babies from public.baby'
            const babyExecute = await connection.query(babies);

            const verifications = "select sum(case when verification.status = 'pending' then 1  else 0 end) pending,sum(case when verification.status = 'completed' then 1  else 0 end) complete,sum(case when verification.status = 'failed' then 1  else 0 end) failed from public.verifications verification"
            const verificationExecute = await connection.query(verifications);
            connection.release;

            return {
                "total_nurses" : users.rows[0].nurses,
                "total_parents": users.rows[0].parents,
                "total_babies" :babyExecute.rows[0].babies,
                "pending_approvals" : verificationExecute.rows[0].pending,
                "total_success_verifications" : verificationExecute.rows[0].complete,
                "total_failed_verifications": verificationExecute.rows[0].failed
            }

        }
        catch(err){
            throw new Error(`admin main panel calculation in admin models: ${err}`);
        }
    }
    async selectUnVerifiedUsers(page: number = 1): Promise<{ total: number, data: UserInfo[] } | string>{
        try{
            const PAGE_SIZE = 5;
            const offset = (page - 1) * PAGE_SIZE;
            const connection = await client.connect();
            const getUsers = "select (firstname || ' ' || lastname) name, username,mobile  from users where  isactive = false and profiletype = 'nurse' LIMIT $1 OFFSET $2"
            const users = await connection.query(getUsers,[PAGE_SIZE, offset]);
            const usersLength = "SELECT COUNT(*) FROM users WHERE isactive = false AND profiletype = 'nurse'";
            const getLength = await connection.query(usersLength);
            const total = parseInt(getLength.rows[0].count);
            connection.release;

            if(users.rows.length == 0){
                return "no unverified nurses found"
            }
            return {
                total,
                data: users.rows
            }; 

        }
        catch(err){
            throw new Error(`admin retriving unverified nurses in admin models: ${err}`);
        }
    }
    async selectUnVerifiedParents(page: number = 1): Promise<{ total: number, data: UserInfo[] } | string>{
        try{
            const PAGE_SIZE = 5;
            const offset = (page - 1) * PAGE_SIZE;
            const connection = await client.connect();
            const getUsers = "select (firstname || ' ' || lastname) name, username,mobile  from users where  isactive = false and profiletype = 'user' LIMIT $1 OFFSET $2"
            const users = await connection.query(getUsers, [PAGE_SIZE, offset]);
            const usersLength = "SELECT COUNT(*) FROM users WHERE isactive = false AND profiletype = 'nurse'";
            const getLength = await connection.query(usersLength);
            const total = parseInt(getLength.rows[0].count);

            if(users.rows.length == 0){
                return "no unverified users found"
            }
            connection.release;
            return {
                total,
                data: users.rows
            };

        }
        catch(err){
            throw new Error(`admin retriving unverified users in admin models: ${err}`);
        }
    }
    async verifyUser(username:string,mobile:string): Promise<UserInfo|string>{
        try{
            if(mobile.length != 11){
                return "Phone Number Must Be 11 numbers"
            }
            const connection = await client.connect();
            const getUsers = "select username from public.users where username=($1) and mobile=($2)"
            const users = await connection.query(getUsers,[username,mobile]);
            
            if(users.rows.length == 0){
                return "This user is not found"
            }
            const verify = "update users set isactive=true where username=($1) and mobile=($2) returning username,firstname,lastname,mobile,isactive"
            const updating = await connection.query(verify,[username,mobile]);
            return updating.rows[0]

        }
        catch(err){
            throw new Error(`admin retriving unverified users in admin models: ${err}`);
        }
    }
    async DeclineUser(username:string,mobile:string): Promise<UserInfo|string>{
        try{
            if(mobile.length != 11){
                return "Phone Number Must Be 11 numbers"
            }
            const connection = await client.connect();
            const getUsers = "select username from public.users where username=($1) and mobile=($2)"
            const users = await connection.query(getUsers,[username,mobile]);
            
            if(users.rows.length == 0){
                return "This user is not found"
            }
            const verify = "update users set isactive=false where username=($1) and mobile=($2) returning username,firstname,lastname,mobile,isactive"
            const updating = await connection.query(verify,[username,mobile]);
            return updating.rows[0]

        }
        catch(err){
            throw new Error(`admin retriving unverified users in admin models: ${err}`);
        }
    }
    async getSuccessVerifications(page: number = 1): Promise<{ total: number, data: UserInfo[] } | string>{
        try{
            const PAGE_SIZE = 5;
            const offset = (page - 1) * PAGE_SIZE;
            const connection = await client.connect();
            const getVerifications = "select * from verifications where status = 'completed' LIMIT $1 OFFSET $2"
            const verifications = await connection.query(getVerifications, [PAGE_SIZE, offset]);
            const usersLength = "select count(*) from verifications where status = 'completed'";
            const getLength = await connection.query(usersLength);

            const total = parseInt(getLength.rows[0].count);
            if(verifications.rows.length == 0){
                return "Verifications are not found"
            }
            connection.release;
            return {
                total,
                data: verifications.rows
            };

        }
        catch(err){
            throw new Error(`admin verifications success retrival error in admin models: ${err}`);
        }
    }
    async getFailedVerifications(page: number = 1): Promise<{ total: number, data: UserInfo[] } | string>{
        try{
            const PAGE_SIZE = 5;
            const offset = (page - 1) * PAGE_SIZE;
            const connection = await client.connect();
            const getVerifications = "select * from verifications where status = 'failed' LIMIT $1 OFFSET $2"
            const verifications = await connection.query(getVerifications, [PAGE_SIZE, offset]);
            const usersLength = "select count(*) from verifications where status = 'failed'";
            const getLength = await connection.query(usersLength);

            const total = parseInt(getLength.rows[0].count);
            if(verifications.rows.length == 0){
                return "Verifications are not found"
            }
            connection.release;
            return {
                total,
                data: verifications.rows
            };

        }
        catch(err){
            throw new Error(`admin verifications failed retrival error in admin models: ${err}`);
        }
    }

    async getLoggingHistory(user_id:number,page: number = 1):  Promise<{ total: number, data: history[] } | string>{
        try{
            const PAGE_SIZE = 5;
            const offset = (page - 1) * PAGE_SIZE;
            const connection = await client.connect();
            const getHistory = "select * from login_history where user_id = ($1) LIMIT $2 OFFSET $3"
            const history = await connection.query(getHistory, [user_id,PAGE_SIZE, offset]);
            const usersLength = "select count(*) from login_history where user_id = ($1)";
            const getLength = await connection.query(usersLength,[user_id]);

            const total = parseInt(getLength.rows[0].count);
            if(history.rows.length == 0){
                return "History are not found"
            }
            connection.release;
            return {
                total,
                data: history.rows
            };

        }
        catch(err){
            throw new Error(`History retrival error in admin models: ${err}`);
        }
    }
    
}