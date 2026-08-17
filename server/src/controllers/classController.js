import * as service from '../services/classService.js';
export async function list(req, res) { res.json({ success: true, data: { classes: await service.listClasses(req.query) } }); }
export async function create(req, res) { const item = await service.createClass(req.body); req.app.get('io').to(`student:${item.studentId._id}`).emit('class:scheduled', { class: item, message: `New class scheduled with ${item.teacher} on ${new Date(item.date).toLocaleDateString()} at ${item.time}.` }); res.status(201).json({ success: true, data: { class: item } }); }
export async function get(req, res) { res.json({ success: true, data: { class: await service.getClass(req.params.id) } }); }
export async function update(req, res) { res.json({ success: true, data: { class: await service.updateClass(req.params.id, req.body) } }); }
export async function cancel(req, res) { res.json({ success: true, data: { class: await service.cancelClass(req.params.id) } }); }
export async function attendance(req, res) { res.json({ success: true, data: { class: await service.markAttendance(req.params.id, req.body.attendance) } }); }
