import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import db from './config/database.js';
import Mitra from './models/MitraModel.js';
import TmptSampah from './models/TmptSampahModel.js';
import Perolehan from './models/PerolehanModel.js';
import Anggaran from './models/AnggaranModel.js';
import Users from './models/userModel.js';
import router from './routes/index.js';

const PORT = process.env.PORT || 5000;
const app = express();

// Define associations
Mitra.hasMany(TmptSampah, { foreignKey: 'id_coffeeshop' });
TmptSampah.belongsTo(Mitra, { foreignKey: 'id_coffeeshop' });

TmptSampah.hasMany(Perolehan, { foreignKey: 'id_tmptsampah' });
Perolehan.belongsTo(TmptSampah, { foreignKey: 'id_tmptsampah' });

Users.hasMany(Anggaran, { foreignKey: 'id_admin' });
Anggaran.belongsTo(Users, { foreignKey: 'id_admin' });

(async () => {
    try {
        await db.authenticate();
        console.log('Database Connected...');

        // Synchronize all defined models to the DB
        await db.sync(); // Use `force: true` only for initial development

        console.log('Database synchronized.');

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
