import z from 'zod'

export const noteSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Title is required.")
        .max(100, "Title cannot exceed 100 characters."),

    content: z
        .string()
        .trim()
        .min(1, "Content cannot be empty"),

    image: z
        .string()
        .optional()
})