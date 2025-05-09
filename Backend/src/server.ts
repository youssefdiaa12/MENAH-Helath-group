import express,{request,response} from 'express';
import bodyParser from 'body-parser';
import userRouter from "./Routes/Users/UsersRoute"
import imagesRouter from "./Routes/Users/ImageRouter"
import {validateMiddleWare} from "./MiddleWares/Authentication"
import {IsAdminValidation} from "./MiddleWares/isAdmin"
import {IsNurseValidation} from "./MiddleWares/isNurse"
import {IsParentValidation} from "./MiddleWares/isParent"
import motherRouter from "./Routes/Nurse/MotherRouter"
import HistoryRouter from "./Routes/Users/CommonRouter"
import EBMRouter from "./Routes/Nurse/EBMRoute"
import MessageRouter from "./Routes/Messages/MessagesRoute"
import AdminRouter from "./Routes/Admins/AdminRoute"
import ParentRouter from "./Routes/Parents/ParentsRoute"
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
app.use("/admin",validateMiddleWare,IsAdminValidation,AdminRouter)
app.use("/mother",validateMiddleWare,IsNurseValidation ,motherRouter)
app.use("/parent",validateMiddleWare,IsParentValidation,ParentRouter)
app.use("/all",validateMiddleWare,HistoryRouter)
app.listen(port,()=>{
    console.log(`server started at http://localhost:${port}`)
});
