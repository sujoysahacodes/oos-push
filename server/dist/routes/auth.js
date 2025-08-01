"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const router = (0, express_1.Router)();
// Mock user data - replace with database
const users = [
    {
        id: 1,
        username: 'admin',
        email: 'admin@abi.com',
        password: '$2a$10$7xN6DVhojBtWlpm4dRIp6e0yg5t8qAboCAbz0ogPZGff/5zyW9UG2', // 'password123'
        role: 'admin',
        name: 'System Administrator',
        department: 'IT'
    },
    {
        id: 2,
        username: 'planner',
        email: 'planner@abi.com',
        password: '$2a$10$7xN6DVhojBtWlpm4dRIp6e0yg5t8qAboCAbz0ogPZGff/5zyW9UG2', // 'password123'
        role: 'planner',
        name: 'Supply Chain Planner',
        department: 'Supply Chain'
    }
];
// User login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username and password are required'
            });
        }
        // Find user
        const user = users.find(u => u.username === username || u.email === username);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
        // Verify password
        const isValidPassword = await bcryptjs_1.default.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            username: user.username,
            role: user.role
        }, process.env.JWT_SECRET || 'fallback-secret', { expiresIn: '24h' });
        // Return user data without password
        const { password: _, ...userWithoutPassword } = user;
        res.json({
            success: true,
            data: {
                user: userWithoutPassword,
                token,
                expiresIn: '24h'
            },
            message: 'Login successful'
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Login failed',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// Verify token
router.get('/verify', async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided'
            });
        }
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'fallback-secret', (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    success: false,
                    message: 'Invalid token'
                });
            }
            // Find user
            const user = users.find(u => u.id === decoded.id);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }
            const { password: _, ...userWithoutPassword } = user;
            res.json({
                success: true,
                data: {
                    user: userWithoutPassword,
                    valid: true
                }
            });
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Token verification failed',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// Logout (client-side token removal)
router.post('/logout', (req, res) => {
    res.json({
        success: true,
        message: 'Logout successful'
    });
});
exports.default = router;
//# sourceMappingURL=auth.js.map