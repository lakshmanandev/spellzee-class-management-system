import * as authService from '../services/authService.js';
export async function login(req, res) { const data = await authService.login(req.body); res.json({ success: true, message: 'Welcome back', data }); }
export async function me(req, res) { res.json({ success: true, data: { user: req.user } }); }
