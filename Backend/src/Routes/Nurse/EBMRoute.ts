import express,{Request,Response} from 'express'
import {CreateBottle,SelectAllBottles,SelectBottle} from "../../Controllers/Nurse/EBMController"
import {ebmInfo} from "../../Types/Nurse/EBMType";



const EBMRouter = express()


EBMRouter.post("/create", async (req: Request<{}, {}, ebmInfo>, res: Response) => {
    try {
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



export default EBMRouter;