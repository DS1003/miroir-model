import app from './config/app.js';
import authRoutes from './routes/authRoutes.js';
// Importer d'autres routes ici

app.use('/api/auth', authRoutes);
// Utiliser d'autres routes ici

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
