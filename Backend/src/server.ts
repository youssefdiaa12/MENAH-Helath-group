import express,{request,response} from 'express';
import bodyParser from 'body-parser';
import userRouter from "./Routes/Users/UsersRoute"
import imagesRouter from "./Routes/Users/ImageRouter"
import {validateMiddleWare} from "./MiddleWares/Authentication"
import {IsNurseValidation} from "./MiddleWares/isNurse"
import EBMRouter from "./Routes/Nurse/EBMRoute"
import MessageRouter from "./Routes/Messages/MessagesRoute"

import babyRouter from "./Routes/Nurse/BabyRoute"
import cors from "cors";

const app:express.Application = express()
const port = 8080

// Global MiddleWares
app.use(cors())
app.use(bodyParser.json())

// User Routes
app.use('/user',userRouter)
app.use('/image',imagesRouter)
app.use("/baby",validateMiddleWare,IsNurseValidation,babyRouter)
app.use("/bottle",validateMiddleWare,IsNurseValidation ,EBMRouter)
app.use("/message",validateMiddleWare,MessageRouter)

app.listen(port,()=>{
    console.log(`server started at http://localhost:${port}`)
});
