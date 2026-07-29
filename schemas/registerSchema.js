import z from 'zod'

const registerSchema = z.object({
    username: z
        .string()
        .trim()
        .min(4, "Username must be atleast 4 characters.")
        .max(30, "Username length cannot exceed 30 characters."),

    password: z
        .string()
        .min(8, "Password must be atleast 8 characters.")
})

export default registerSchema