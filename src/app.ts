import express from 'express';
import imagesRouter from './routes/images';

const app = express();

app.get('/', (req, res) => res.send('Image Resizer API is up.'));
app.use('/api/images', imagesRouter);

export default app;
