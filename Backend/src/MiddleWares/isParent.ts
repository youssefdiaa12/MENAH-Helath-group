
import express from 'express';


export const IsParentValidation = async(req:express.Request,res:express.Response,next:Function): Promise<void>=>{
    try {
        const user = (req as any).user;
        if (!user || user.role !== 'user') {
            res.status(403).json({ message: "Access denied: only parents can access this endpoint" });
            return;
        }
        next();
    } catch (error) {  
        let statusCode = 403;
        let message = 'Access denied, Parents can only access this endpoint';
        res.status(statusCode).json(message);
        return 
    }
}