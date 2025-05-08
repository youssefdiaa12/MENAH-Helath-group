import express,{Request,Response} from 'express'
import {motherinfo} from "../../Types/Nurse/MotherType"
import {AddMotherInfo} from "../../Controllers/Nurse/MotherController"

const motherRouter = express()


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


export default motherRouter;