import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const validateMiddleWare = async(req:express.Request,res:express.Response,next:Function): Promise<void>=>{
    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        res.status(401).json('Access denied, no token provided');
        return
        }

        const token = authorizationHeader.split(' ')[1];
        const payload = jwt.verify(token as string, ((process.env.TOKENSECRET as unknown) as string)) as { [key: string]: any };
        if(!payload.isActive){
            res.status(401).json("Admin has not approved you yet, please wait");
        }
        (req as any).user = payload;
        
        next();
    } catch (error) {  
        let statusCode = 401;
        let message = 'Access denied, invalid token';
        res.status(statusCode).json(message);
        return 
    }
}