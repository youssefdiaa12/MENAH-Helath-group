import express,{Request,Response} from 'express'
import multer from 'multer';
import path from 'path';
import dotenv from 'dotenv'
import {createUser,LogginUserIn} from "../../Controllers/Users/UserController"

dotenv.config()
const userRouter = express()

let imagename:string = ''
// configuring multer to be able to recieve images in the request body
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'userProfileImages/'); 
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
        imagename = uniqueName
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

// signing user in the system
userRouter.post('/signup',upload.single('profileImage'),async (req:Request,res:Response) =>{
    try{
        const response = await createUser(req.body.username, req.body.firstname, req.body.lastname, req.body.mobile, `${process.env.IMAGEROUTE}${imagename}`, req.body.password, req.body.profileType)
        res.json(response)
    }
    catch(error){
        throw new Error(`user creation error in user routes: ${error}`);
    }
});

// signing user in the system
userRouter.post('/signin',async (req:Request,res:Response) =>{
    try{
        const response = await LogginUserIn(req.body.username, req.body.password)
        res.json(response)
    }
    catch(error){
        throw new Error(`user loggin in error in user routes: ${error}`);
    }
});


export default userRouter