import {z} from 'zod'

export const usernameValidation = z
    .string()
    .min(2,"username must be greater than 2 character")
    .max(20,'username should not be greater than 20 characters')
    .regex(/^[a-zA_Z0-9_]+$/,"specail character not allowed in username")

export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message:'Invalid email address'}),
    password: z.string().min(6,{message:'password must be 6 characters'})
})    