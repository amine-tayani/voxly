import { z } from 'zod';

export const SignupSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required.',
    })
    .email({ message: 'Invalid email format.' }),
  password: z
    .string({
      required_error: 'Password is required.',
    })
    .min(6, { message: 'Password must be at least 6 characters long.' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter.',
    })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: 'Password must contain at least one special character.',
    }),
});
