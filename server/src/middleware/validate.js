import AppError from '../utils/AppError.js';
export const validate = (schema) => (req, _res, next) => { const result = schema.safeParse(req.body); if (!result.success) throw new AppError(result.error.issues.map((x) => x.message).join(', ')); req.body = result.data; next(); };
