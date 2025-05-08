import express,{Request,Response} from 'express'
import {getCalculations,getUnverifiedNurses,getUnverifiedParents,VerifyUser,UnVerifyUser,getBottleVerificationsSuccedd,getBottleVerificationsFailed,getHistory} from "../../Controllers/Admins/AdminController"



const AdminRouter = express()


AdminRouter.get("/calculations", async (req: Request, res: Response) => {
    try {
        const response = await getCalculations();
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `admin calculations error in admin routes: ${error}` });
    }
});

AdminRouter.post("/unverifiedNurses", async (req: Request, res: Response) => {
    try {
        if(!req.body || typeof req.body !== "object" || Array.isArray(req.body)){
            res.status(400).json({message: "body is required"})
            return;
        }

        const response = await getUnverifiedNurses(req.body.page);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `error in retriving unverified nurses in admin routes: ${error}` });
    }
});

AdminRouter.post("/unverifiedParents", async (req: Request, res: Response) => {
    try {
        if(!req.body || typeof req.body !== "object" || Array.isArray(req.body)){
            res.status(400).json({message: "body is required"})
            return;
        }


        const response = await getUnverifiedParents(req.body.page);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `error in retriving unverified parents in admin routes: ${error}` });
    }
});



AdminRouter.post("/verify", async (req: Request, res: Response) => {
    try {
        if(!req.body || typeof req.body !== "object" || Array.isArray(req.body)){
            res.status(400).json({message: "body is required"})
            return;
        }


        const response = await VerifyUser(req.body.username,req.body.phone);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `error in verifying user in admin routes: ${error}` });
    }
});
AdminRouter.post("/UnVerify", async (req: Request, res: Response) => {
    try {
        if(!req.body || typeof req.body !== "object" || Array.isArray(req.body)){
            res.status(400).json({message: "body is required"})
            return;
        }


        const response = await UnVerifyUser(req.body.username,req.body.phone);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `error in unverifying user in admin routes: ${error}` });
    }
});

AdminRouter.post("/succeddVerifications", async (req: Request, res: Response) => {
    try {
        if(!req.body || typeof req.body !== "object" || Array.isArray(req.body)){
            res.status(400).json({message: "body is required"})
            return;
        }


        const response = await getBottleVerificationsSuccedd(req.body.page);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `error in retriving unverified parents in admin routes: ${error}` });
    }
});

AdminRouter.post("/failedVerifications", async (req: Request, res: Response) => {
    try {
        if(!req.body || typeof req.body !== "object" || Array.isArray(req.body)){
            res.status(400).json({message: "body is required"})
            return;
        }


        const response = await getBottleVerificationsFailed(req.body.page);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `error in retriving unverified parents in admin routes: ${error}` });
    }
});

AdminRouter.post("/history", async (req: Request, res: Response) => {
    try {
        if(!req.body || typeof req.body !== "object" || Array.isArray(req.body)){
            res.status(400).json({message: "body is required"})
            return;
        }


        const response = await getHistory(req.body.user_id,req.body.page);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `error in retriving login history in admin routes: ${error}` });
    }
});


export default AdminRouter;