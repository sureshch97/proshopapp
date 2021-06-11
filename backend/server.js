import express from 'express'
import path from 'path'
import dotev from 'dotenv'
import morgan from 'morgan'
import connectDb from './config/db.js'
import products from './routes/productRoutes.js'
import users from './routes/userRoute.js'
import orders from './routes/orderRoutes.js'
import upload from './routes/uploadsRoutes.js'


const app = express();

app.use(express.json());

dotev.config();

//Data base Connect
connectDb();

app.use('/api/products' , products );
app.use('/api/users' , users );
app.use('/api/orders' , orders );
app.use('/api/upload' , upload);



const __dirname = path.resolve()

app.use('/uploads' , express.static(path.join(__dirname , '/uploads')))

app.get('/api/config/paypal' , (req,res)=>res.send(process.env.PAYPAL_CLIENT_ID))


if(process.env.NODE_ENV === 'production'){

    app.use(express.static(path.join(__dirname , '/frontend/build')));

    app.get('*' , (req,res)=>res.sendFile(path.resolve(__dirname , 'frontend','build','index.html')))

}else{
    
     app.get('/' , (req,res)=>res.send('api is running'));

}

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`server is running at port ${PORT}`));
