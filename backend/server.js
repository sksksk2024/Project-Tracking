import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';

// Initialize environment variables
dotenv.config();

const app = express();

app.use(cors());

// Use Helmet to set security headers
// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       directives: {
//         defaultSrc: ["'self'"],
//         scriptSrc: [
//           "'self'",
//           "'unsafe-inline'",
//           'https://project-tracking-intro.onrender.com',
//         ],
//         imgSrc: [
//           "'self'",
//           'data:',
//           'https://project-tracking-intro.onrender.com',
//         ],
//         styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
//         connectSrc: ["'self'", process.env.FRONTEND_URL],
//         fontSrc: [
//           "'self'",
//           'https://fonts.googleapis.com',
//           'https://fonts.gstatic.com',
//         ],
//         objectSrc: ["'none'"],
//         upgradeInsecureRequests: [],
//       },
//     },
//   })
// );

// // CORS Configuration
// const allowedOrigins = [
//   'http://localhost:3000', // Allow local dev
//   process.env.FRONTEND_URL, // Production URL from environment variables
// ];

// // Handle CORS
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       console.log(`Origin: ${origin}`); // Log the origin being checked
//       if (!origin) return callback(null, true); // Allow requests with no origin (like mobile apps or curl requests)
//       if (allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     methods: ['GET', 'POST', 'OPTIONS'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

// Middleware to parse JSON
app.use(express.json());

// Serve frontend files
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendPath = path.join(__dirname, '../frontend/build');
app.use(express.static(frontendPath));

// Handle fallback for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// API Routes
app.post('/api/login', (req, res) => {
  res.json({
    message:
      'This project is not meant to be a full-stack one. Please try again on a future one 👩🏽‍🍳⋆.ೃ࿔🍪*:･',
  });
});

// Fallback route for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html')); // Correct reference to frontendPath
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
