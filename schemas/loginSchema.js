import { z } from 'zod'

const loginSchema = z.object({
    username: z
        .string()
        .trim()
        .min(1, "Username cannot be empty"),
        
    password: z 
        .string()
        .min(1, "Password cannot be empty"),
})

export default loginSchema