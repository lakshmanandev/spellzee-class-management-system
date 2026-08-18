import * as service from '../services/studentService.js';
export async function list(req, res) { res.json({ success: true, data: { students: await service.listStudents(req.query.q) } }); }
export async function create(req, res) { res.status(201).json({ success: true, data: { student: await service.createStudent(req.body) } }); }
export async function get(req, res) { res.json({ success: true, data: { student: await service.getStudent(req.params.id) } }); }
export async function update(req, res) { const student = await service.updateStudent(req.params.id, req.body); req.app.get('io').to(`student:${student._id}`).emit('student:profile-updated', { student, message: 'Your class schedule has been updated.' }); res.json({ success: true, data: { student } }); }
export async function deactivate(req, res) { res.json({ success: true, data: { student: await service.updateStudent(req.params.id, { status: 'INACTIVE' }) } }); }
