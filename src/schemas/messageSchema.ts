import {z} from "zod"

export const messageSchema = z.object({
    content:z
    .string()
    .min(10,{message:"message must be more than 10 characters"})
    .max(300,{message:"message must not be longer than 300 characters"})
})