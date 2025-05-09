import express,{Request,Response} from 'express'
import {getParentBabies,getParentEBM,getCalculations} from "../../Controllers/Parents/ParentsController"


const ParentRouter = express()



ParentRouter.post("/babies", async (req: Request, res: Response) => {
    try {
        if(!req.body || typeof req.body !== "object" || Array.isArray(req.body)){
            res.status(400).json({message: "body is required"})
            return;
        }
        const response = await getParentBabies(req.body.username);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `babies retrieval error in parent routes: ${error}` });
    }
});


ParentRouter.post("/EBM", async (req: Request, res: Response) => {
    try {
        if(!req.body || typeof req.body !== "object" || Array.isArray(req.body)){
            res.status(400).json({message: "body is required"})
            return;
        }
        const response = await getParentEBM(req.body.page,req.body.username);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `EBM retrieval error in parent routes: ${error}` });
    }
});

ParentRouter.post("/calculations", async (req: Request, res: Response) => {
    try {
        if(!req.body || typeof req.body !== "object" || Array.isArray(req.body)){
            res.status(400).json({message: "body is required"})
            return;
        }
        const response = await getCalculations(req.body.username);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `mother calculations error in parent routes: ${error}` });
    }
});

export default ParentRouter;