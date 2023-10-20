import express from "express";
import { mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import bookRoutes from './routes/bookRoutes.js'
import cors from 'cors'

const PORT = 5555;

const app = express();

//middleware for handling CORS POLICY
//OPTION:1- Allow all origins with default of cors(*)
app.use(cors());
//Option:2 - Allow custom origins
// app.use(cors({
//     origin:'http://localhost:3000',
//     methods: ['GET','PUT','POST','DELETE'],
//     allowHeaders: ['Content-type']
// }))

app.use(express.json()); //middleware for parshing request body

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Welcome to Mern');
})

app.use('/books', bookRoutes)

mongoose.connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port number: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error)
    })