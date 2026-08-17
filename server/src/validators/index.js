import { z } from 'zod';
const email = z.string().email('Enter a valid email'); const password = z.string().min(8, 'Password needs at least 8 characters');
export const loginSchema = z.object({ email, password: z.string().min(1, 'Password is required') });
export const studentSchema = z.object({ name: z.string().min(2), email, phone: z.string().min(7).max(20).optional().or(z.literal('')), password: password.optional(), course: z.string().min(2), status: z.enum(['ACTIVE', 'INACTIVE']).optional() });
export const classSchema = z.object({ studentId: z.string().length(24), course: z.string().min(2), teacher: z.string().min(2), date: z.string().datetime({ offset: true }), time: z.string().regex(/^([01]\\d|2[0-3]):[0-5]\\d$/, 'Time must be HH:mm'), status: z.enum(['SCHEDULED', 'COMPLETED', 'CANCELLED']).optional() });
export const attendanceSchema = z.object({ attendance: z.enum(['PRESENT', 'ABSENT']) });
