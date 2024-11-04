import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your-secret-key'; // Use environment variables for security

// Function to generate a JWT token
export const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email },
        SECRET_KEY,
        { expiresIn: '1h' } // Token expires in 1 hour
    );
};

// Function to verify a JWT token
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null;
    }
};
