import express from 'express';
import cors from 'cors'; // Import CORS
import sequelize from './config/database.js'; // Import the database configuration
import userRoutes from './routes/userRoutes.js';
import passport from 'passport';
import initializePassport from './config/passport.js';

const app = express();
const PORT = process.env.PORT || 5000;
initializePassport(passport);

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
  });
  

app.use(express.json()); // To parse JSON request bodies
app.use(passport.initialize());

// Routes
app.use('/api', userRoutes);

// Start the server
const startServer = async () => {
    try {
        await sequelize.authenticate(); // Test the database connection
        console.log('Database connected successfully.');
        await sequelize.sync(); // Sync models with the database
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();
export default app;
