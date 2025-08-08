import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {})
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error('MongoDB connection Error:', err));

app.get('/api/test', (req, res) => {
    res.status(200).json({ 
        message: "Welcome to the Render Test App",
        status: "success"
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: "Internal Server Error",
        error: err.message
    });
});

app.listen(PORT, (error) => {
    if(!error){
        console.log('Server running in port:', PORT);
    } else {
        console.log('Error starting server:', error);
    }
});