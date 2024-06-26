import express from 'express'
import dotenv from "dotenv";
import cors from 'cors'
import mongoose from 'mongoose';
import useragent from 'express-useragent';
import requestIp from 'request-ip';
import userRoutes from './routes/users.js'
import questionRoutes from './routes/Questions.js'
import answerRoutes from './routes/Answers.js'
import translationRoutes from './routes/translation.js'

const app = express();
dotenv.config();
app.use(useragent.express());
app.use(requestIp.mw());

app.use(express.json({limit: "30mb", extended: true}))
app.use(express.urlencoded({limit: "30mb", extended: true}))
app.use(cors({
    origin: ["https://stack-overflow-6ft-alien.vercel.app"],
    methods: ["POST", "GET", "PATCH", "PUT", "DELETE"],    
    credentials: true 
  }));

app.get('/',(req,res) => {
    res.send("This is a Stack Overflow Clone API")
})

app.use('/user', userRoutes)
app.use('/questions', questionRoutes)
app.use('/answer', answerRoutes)
app.use('/translations', translationRoutes)

const PORT = process.env.PORT || 5000

const DATABASE_URL =  process.env.CONNECTION_URL 

mongoose.connect( DATABASE_URL, { useNewUrlParser:true,useUnifiedTopology: true } )
    .then(() => app.listen(PORT, () => { console.log(`server running on port ${PORT}`)}))
    .catch((err) => console.log(err.message))
