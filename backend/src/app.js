import express from  "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app=express()

app.use(cors({
 origin:process.env.ORIGIN_NAME,
 credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

 
import warehouseRouter from "./routes/warehouseRoutes.js"
import bookingrouter from "./routes/bookingRoutes.js";
import  capsulerouter from './routes/capsuleRoutes.js';
import userRoutes from './routes/userRoutes.js';
app.use('/api/users', userRoutes);

app.use('/api/warehouses', warehouseRouter);
app.use('/api/bookings', bookingrouter);
app.use('/api/capsules',capsulerouter);




export default app

