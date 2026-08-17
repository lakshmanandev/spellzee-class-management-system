import { Router } from 'express'; import * as c from '../controllers/authController.js'; import { validate } from '../middleware/validate.js'; import { loginSchema } from '../validators/index.js'; import { authenticate } from '../middleware/auth.js';
const router = Router(); router.post('/login', validate(loginSchema), c.login); router.get('/me', authenticate, c.me); export default router;
