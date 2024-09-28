import {z} from 'zod'
export const formSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    contactNo: z
      .string()
      .length(10, 'Contact number must be exactly 10 characters long'),
    department: z.string().min(1, 'Department is required'),
    email: z.string().email('Invalid email format'),
    gender: z.enum(['MALE', 'FEMALE'], {
      required_error: 'Gender is required',
    }),
  });