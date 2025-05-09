import express,{Request,Response} from 'express'
import {getHistory} from "../../Controllers/Admins/AdminController"

import {getProfile}  from "../../Controllers/Parents/ParentsController"

const HistoryRouter = express()


HistoryRouter.post("/history", async (req: Request, res: Response) => {
    try {
        if(!req.body || typeof req.body !== "object" || Array.isArray(req.body)){
            res.status(400).json({message: "body is required"})
            return;
        }


        const response = await getHistory(req.body.user_id,req.body.page);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `error in retriving login history in common routes: ${error}` });
    }
});

HistoryRouter.post("/profile", async (req: Request, res: Response) => {
    try {
        if(!req.body || typeof req.body !== "object" || Array.isArray(req.body)){
            res.status(400).json({message: "body is required"})
            return;
        }


        const response = await getProfile(req.body.user_id);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `error in retriving user profile in common routes: ${error}` });
    }
});



export default HistoryRouter