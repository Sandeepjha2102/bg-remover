import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/mongodb.js';
import userRouter from './routes/userRoutes.js';
import ImageRouter from './routes/ImageRoutes.js';

const PORT = process.env.PORT || 4000;
const app = express();

await connectDB()

app.use(express.json());
app.use(cors());

app.use('/api/user', userRouter)
app.use('/api/image', ImageRouter)

app.get('/', (req, res) => res.send('API Working'))

app.listen(PORT, () => 
  console.log(`Server running on port ${PORT}`)
);