import { Router } from 'express'; import * as c from '../controllers/dashboardController.js'; import { authenticate, authorize } from '../middleware/auth.js';
const router = Router(); router.get('/admin', authenticate, authorize('ADMIN'), c.adminDashboard); router.get('/student', authenticate, authorize('STUDENT'), c.studentDashboard); export default router;
