import express,{Request,Response} from 'express'
import {CreateBaby,SearchBaby, UpdateBabyVisitNumber,SaveBabyPhoto} from "../../Controllers/Nurse/BabyController"
import {BabyInfo} from "../../Types/Nurse/BabyType";
import multer from 'multer';
import path from 'path';


const babyRouter = express()
let imagename:string = ''
// configuring multer to be able to recieve images in the request body
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'babyPhotoes/'); 
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
        imagename = uniqueName
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

// baby creation route
babyRouter.post("/create", async (req: Request<{}, {}, BabyInfo>, res: Response) => {
    try {
        if(!req.body || typeof req.body !== "object" || Array.isArray(req.body)){
            res.status(400).json({message: "body is required"})
            return;
        }
        const babyData: BabyInfo = req.body;

        const response = await CreateBaby(babyData);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `baby creation error in baby routes: ${error}` });
    }
});

babyRouter.post("/search", async (req: Request, res: Response) => {
    try {
        if(!req.body || typeof req.body !== "object" || Array.isArray(req.body)){
            res.status(400).json({message: "body is required"})
            return;
        }
        const searchValue = req.body.value;
        const searchField = req.body.field;
        const response = await SearchBaby(searchValue,searchField);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `baby searching error in baby routes: ${error}` });
    }
});

babyRouter.post("/updateVisitNumber", async (req: Request, res: Response) => {
    try {
        if(!req.body || typeof req.body !== "object" || Array.isArray(req.body)){
            res.status(400).json({message: "body is required"})
            return;
        }
        const mrn = req.body.mrn;
        const visitNumber = req.body.visitNumber;
        const response = await UpdateBabyVisitNumber(visitNumber,mrn);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `baby visit number update error in baby routes: ${error}` });
    }
});

babyRouter.post('/savePhoto',upload.single('image'),async (req:Request,res:Response) =>{
    try{
        if(!req.body || typeof req.body !== "object" || Array.isArray(req.body)){
            res.status(400).json({message: "body is required"})
            return;
        }
        console.log(imagename)
        const response = await SaveBabyPhoto(req.body.mrn, `${process.env.BABYIMAGE}${imagename}`, req.body.category)
        res.json(response)
    }
    catch(error){
        throw new Error(`baby saving photo error in baby routes: ${error}`);
    }
});










export default babyRouter