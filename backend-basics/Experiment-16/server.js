// server.js - Complete Express Application with Middleware and Routes

const express = require('express');
const app = express();
const port = 3000;

// --- 1. Data Store ---
let users = [];

// --- 2. Global/Application-Level Middleware ---

// Built-in Middleware: Parses incoming JSON bodies and attaches them to req.body.
app.use(express.json());

// Application-Level Logging Middleware (First Logger)
// This will log every request that comes in.
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// --- 3. Custom Authentication Middleware ---

function authMiddleware(req, res, next) {
    const token = req.headers['authorization']; 
    if (token === 'mysecrettoken') {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
}

// --- 4. Route-Specific Middleware Example ---

app.get('/protected', authMiddleware, (req, res) => {
    res.send('This is a protected route');
});

// --- 5. Another Global Logging Middleware (Second Logger) ---

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// --- 6. Router-Level Middleware and Routes ---

const adminRouter = express.Router();

adminRouter.use((req, res, next) => {
    console.log('Admin router middleware executed');
    next();
});

adminRouter.get('/dashboard', (req, res) => {
    res.send('Admin dashboard');
});

app.use('/admin', authMiddleware, adminRouter);

// --- 7. User CRUD API Endpoints ---

// Create a user (POST /users)
app.post('/users', (req, res) => {
    const user = req.body;
    users.push(user);
    res.status(201).json({ message: 'User added', user });
});

// Get all users (GET /users)
app.get('/users', (req, res) => {
    res.status(200).json(users);
});

// Update a user (PUT /users/:id)
app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const updatedUser = req.body;
    users = users.map(user => (user.id === id ? updatedUser : user));
    res.status(200).json({ message: 'User updated', updatedUser });
});

// Delete a user (DELETE /users/:id)
app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    users = users.filter(user => user.id !== id);
    res.status(200).json({ message: 'User deleted' });
});

// --- 8. Server Start ---
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
