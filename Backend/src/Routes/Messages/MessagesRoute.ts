import express,{Request,Response} from 'express'
import {CreateMessage,SelectMySentMessages,SelectMyrecieverMessages,MarkAsRead} from "../../Controllers/Messages/MessageController"
import {message} from "../../Types/message";



const MessageRouter = express()


MessageRouter.post("/create", async (req: Request<{}, {}, message>, res: Response) => {
    try {
        const messData: message = req.body;

        const response = await CreateMessage(messData);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Message creation error in Message routes: ${error}` });
    }
});

MessageRouter.post("/sent", async (req: Request, res: Response) => {
    try {
        const id = req.body.id;

        const response = await SelectMySentMessages(id);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Message syncing error in Message routes: ${error}` });
    }
});

MessageRouter.post("/markAsRead", async (req: Request, res: Response) => {
    try {
        const userId = req.body.userId;
        const messageId = req.body.id;
        const response = await MarkAsRead(userId,messageId);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Message updating error in Message routes: ${error}` });
    }
});

MessageRouter.post("/recievings", async (req: Request, res: Response) => {
    try {
        const id = req.body.id;

        const response = await SelectMyrecieverMessages(id);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Message syncing error in Message routes: ${error}` });
    }
});

export default MessageRouter