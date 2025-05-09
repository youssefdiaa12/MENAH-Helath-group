import bcrypt from "bcrypt"
import {user,userInfo} from "../../Types/Users/UsersType"
import {response} from "../../Types/Response"
import {userModel} from "../../Models/Users/UsersModel"
import dotenv from "dotenv"
import jwt from  "jsonwebtoken"


dotenv.config();

const hashThePass = (password:string)=>{
    try{
        return bcrypt.hashSync(
            password + process.env.PEPPER, 
            parseInt((process.env.SALT_ROUNDS as unknown) as string)
        );
    }
    catch(err){
        throw new Error(`hasshing password in controller: ${err}`);
    }
}
const createToken = async(userInfo:user):Promise<string>=>{
    try{
        const newtoken = jwt.sign({id:userInfo.id,username:userInfo.username,firstname:userInfo.firstname, lastname:userInfo.lastname, role:userInfo.profiletype,isActive:userInfo.isactive},((process.env.TOKENSECRET as unknown) as string));
        return newtoken;
    }
    catch(err){
        throw new Error(`Error creating User Token: ${err}`);
    }
}

export const createUser = async(username:string, firstname:string, lastname:string, mobile:string, profileImage:string,password:string,profileType:string):Promise<response|string> =>{
    try{
        const hashedpassword = hashThePass(password);
        const usermodel:userModel = new userModel();
        const userRegisteredData = await usermodel.Create(username,firstname,lastname,mobile,profileImage,hashedpassword,profileType)
        if(userRegisteredData){
            let response:userInfo = {
                id :userRegisteredData.id,
                username : userRegisteredData.username,
                firstname : userRegisteredData.firstname,
                lastname : userRegisteredData.lastname,
                mobile : userRegisteredData.mobile,
                profileimage : userRegisteredData.profileimage,
                profiletype : userRegisteredData.profiletype,
                isactive :userRegisteredData.isactive
            }
            return {
                Status:true,
                Data:response,
                Message: "User is Created Successfully"
            } 
        }
        return {
            Status:false,
            Data:null,
            Message: "User Already Registered Before"
        } 
    }
    catch(error){
        throw new Error(`error in creating user account in user contoller: ${error}`);
    }
}

export const LogginUserIn = async(username:string,password:string):Promise<response|string> =>{
    try{
        const usermodel:userModel = new userModel();
        const result = await usermodel.Select(username);
        if(result != null){
            if (!result.isactive){
                return {
                    Status:false,
                    Data:null,
                    Message: "Admin has not approved you yet, please wait"
                } 
            }
            if(bcrypt.compareSync(password+ (process.env.PEPPER as string), result.password)){
                const token = await createToken(result);
                let response:userInfo = {
                    id :result.id,
                    username : result.username,
                    firstname : result.firstname,
                    lastname : result.lastname,
                    mobile : result.mobile,
                    profileimage : result.profileimage,
                    profiletype : result.profiletype,
                    isactive:result.isactive,
                    token:token
                } 
                return {
                    Status:true,
                    Data:response,
                    Message: "User Logged in Successfully"
                } 
            }
            else{
                return {
                    Status:false,
                    Data:null,
                    Message: "Password is Incorrect"
                } 
            }
        }
        return {
            Status:false,
            Data:null,
            Message: "User Not Found"
        } 
    }
    catch(error){
        throw new Error(`error in creating user account in user contoller: ${error}`);
    }
}

export const LoggUserout = async(username:string):Promise<response|string> =>{
    try{
        if(username == null || username==''){
            return "username is required";
        }
        if(typeof username != "string"){
            return "username must be string"
        }
        const usermodel:userModel = new userModel();
        const result = await usermodel.logout(username);
        if(typeof result != "string"){
            return {
                Status:true,
                Data:null,
                Message: "user logged out successfully"
            } 
        }
        return {
            Status:false,
            Data:null,
            Message: (result as string) 
        } 
    }
    catch(error){
        throw new Error(`error in loggin user out in user contoller: ${error}`);
    }
}