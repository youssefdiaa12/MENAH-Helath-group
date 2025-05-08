import express,{Request,Response} from 'express'
import {motherinfo} from "../../Types/Nurse/MotherType"
import {AddMotherInfo,SaveMotherPhoto} from "../../Controllers/Nurse/MotherController"
import multer from 'multer';
import path from 'path';

const motherRouter = express()
let imagename:string = ''
// configuring multer to be able to recieve images in the request body
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'motherPhotoes/'); 
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
        imagename = uniqueName
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });


motherRouter.post("/create", async (req: Request<{}, {}, motherinfo>, res: Response) => {
    try {
        if(!req.body || typeof req.body !== "object" || Array.isArray(req.body)){
            res.status(400).json({message: "body is required"})
            return;
        }
        const motherData: motherinfo = req.body;

        const response = await AddMotherInfo(motherData);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `mother info error in mother routes: ${error}` });
    }
});


motherRouter.post('/savePhoto',upload.single('image'),async (req:Request,res:Response) =>{
    try{
        if(!req.body || typeof req.body !== "object" || Array.isArray(req.body)){
            res.status(400).json({message: "body is required"})
            return;
        }
        console.log(imagename)
        const response = await SaveMotherPhoto(req.body.mrn, `${process.env.BABYIMAGE}${imagename}`, req.body.category)
        res.json(response)
    }
    catch(error){
        throw new Error(`mother saving photo error in mother routes: ${error}`);
    }
});


export default motherRouter;