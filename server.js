import express from 'express';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from "cors";
import db from './config/database.js';
import Users from './models/userModel.js';
import Notes from './models/notesModel.js';
import router from './routes/index.js';
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

try {
    await db.authenticate();
    console.log('Database Connected...');
    await Users.sync();
    await Notes.sync();
} catch (error) {
    console.error(error);
}

app.use(cors({ credentials: true, origin: "https://mynotes-frontend-dot-project-180324-b-03.et.r.appspot.com" }));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(PORT, ()=> console.log(`Server running at port ${PORT}`));
