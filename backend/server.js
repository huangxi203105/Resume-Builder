import express from 'express';
import cors from 'cors';
import 'dotenv/config.js';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoutes.js';
import path from 'path';
import resumeRouter from './routes/resumeRoutes.js';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 4000;
app.use(cors()); 

connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/api/auth', userRouter);
app.use('/api/resume', resumeRouter);

app.use(
  '/uploads',
  express.static(path.join(__dirname, 'uploads'),{
    setHeaders:(res,_path)=>{
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    }
  })
)

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running on port ${process.env.PORT || PORT}`);
});