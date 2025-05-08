import express,{Request,Response} from 'express'
import {CreateBottle,SelectAllBottles,SelectBottle,UseBottle,addVerification,verify,SelectBottleUsage} from "../../Controllers/Nurse/EBMController"
import {ebmInfo,BottleUsageInfo} from "../../Types/Nurse/EBMType";
import {verification} from "../../Types/Nurse/VerificationType"


const EBMRouter = express()


EBMRouter.post("/create", async (req: Request<{}, {}, ebmInfo>, res: Response) => {
    try {
        if(!req.body || typeof req.body !== "object" || Array.isArray(req.body)){
            res.status(400).json({message: "body is required"})
            return;
        }
        const ebmData: ebmInfo = req.body;

        const response = await CreateBottle(ebmData);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `bottle creation error in ebm routes: ${error}` });
    }
});

EBMRouter.post("/selectBottle", async (req: Request, res: Response) => {
    try {
        if(!req.body || typeof req.body !== "object" || Array.isArray(req.body)){
            res.status(400).json({message: "body is required"})
            return;
        }
        const response = await SelectBottle(req.body.id);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `bottle selection error in ebm routes: ${error}` });
    }
});


EBMRouter.get("/select", async (req:Request , res: Response) => {
    try {
        const response = await SelectAllBottles();
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `bottle selection error in ebm routes: ${error}` });
    }
});
EBMRouter.get("/selectUsage", async (req:Request , res: Response) => {
    try {
        const response = await SelectBottleUsage();
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `bottle usage selection error in ebm routes: ${error}` });
    }
});



EBMRouter.post("/use", async (req: Request<{}, {}, BottleUsageInfo>, res: Response) => {
    try {
        if(!req.body || typeof req.body !== "object" || Array.isArray(req.body)){
            res.status(400).json({message: "body is required"})
            return;
        }
        const ebmData: BottleUsageInfo = req.body;

        const response = await UseBottle(ebmData);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `bottle Usage error in ebm routes: ${error}` });
    }
});

EBMRouter.post("/addVerification", async (req: Request<{}, {}, verification>, res: Response) => {
    try {
        if(!req.body || typeof req.body !== "object" || Array.isArray(req.body)){
            res.status(400).json({message: "body is required"})
            return;
        }
        const verificationData: verification = req.body;

        const response = await addVerification(verificationData);
        
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `verification addition error in ebm routes: ${error}` });
    }
});

EBMRouter.post("/verify", async (req: Request, res: Response)  => {
    try {
        if(!req.body || typeof req.body !== "object" || Array.isArray(req.body)){
            res.status(400).json({message: "body is required"})
            return;
        }
        const response = await verify(req.body.id,req.body.value,req.body.second_nurse,req.body.status);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `verification updating error in ebm routes: ${error}` });
    }
});


export default EBMRouter;