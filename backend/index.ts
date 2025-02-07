import express from 'express';

import connectDB from './db';
import { articlesRouter } from './routers/articlesRouter';

const app = express();


app.use(express.json());
app.use('/api/articles', articlesRouter);

app.listen(8000, () => console.log(`listening to port ${8000}`));
connectDB();
