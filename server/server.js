import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/mongodb.js';
import userModel from './models/userModel.js';
import userRouter from './routes/userRoutes.js';
import ImageRouter from './routes/ImageRoutes.js';
import { removeBgImage } from './controllers/ImageController.js';

//app config
const PORT = process.env.PORT || 4000;
const app = express();
await connectDB()


//INITIALIZE MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use('/app/image', ImageRouter)


//api routers
app.get('/', (req, res) => res.send('API Working'))
app.use('/api/user', userRouter)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));