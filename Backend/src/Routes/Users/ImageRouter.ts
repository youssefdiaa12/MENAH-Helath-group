import express from 'express';
import path from 'path';


const imagesRouter = express();
imagesRouter.use(express.static(path.join(__dirname, "../../../userProfileImages")));

imagesRouter.get('/userImages/:imageName',(req:express.Request,res:express.Response)=>{
    try{
        const { imageName } = req.params;
        res.contentType('image/PNG');
        res.sendFile(path.join(__dirname, '../../../userProfileImages', imageName))
    }
    catch(err){
        res.status(404).send('image is not found');
    }
});

imagesRouter.get('/babyImages/:imageName',(req:express.Request,res:express.Response)=>{
    try{
        const { imageName } = req.params;
        res.contentType('image/PNG');
        res.sendFile(path.join(__dirname, '../../../babyPhotoes', imageName))
    }
    catch(err){
        res.status(404).send('image is not found');
    }
});
imagesRouter.get('/motherImages/:imageName',(req:express.Request,res:express.Response)=>{
    try{
        const { imageName } = req.params;
        res.contentType('image/PNG');
        res.sendFile(path.join(__dirname, '../../../motherPhotoes', imageName))
    }
    catch(err){
        res.status(404).send('image is not found');
    }
});
export default imagesRouter;
