import express from 'express';
import connectDB from './db';
import { articlesRouter } from './routers/articlesRouter';
import cors from "cors";

const app = express();

// Allow requests from frontend domain
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204
}));

app.use(express.json());
app.use('/api/articles', articlesRouter);

// Ensure backend listens on all interfaces
app.listen(8000, "0.0.0.0", () => console.log("Backend running on port 8000"));
connectDB();
