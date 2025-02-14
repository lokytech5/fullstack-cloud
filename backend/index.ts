import express from 'express';

import connectDB from './db';
import { articlesRouter } from './routers/articlesRouter';

import cors from "cors"

const app = express();

app.use(cors({
    origin: ["http://fullstack.dostech.solutions"], // Allow frontend URLs
    allowedHeaders: ["Content-Type", "Authorization", "Accept"]
}));


app.use(express.json());
app.use('/api/articles', articlesRouter);

app.listen(8000, "0.0.0.0",() => console.log(`listening to port ${8000}`));
connectDB();
