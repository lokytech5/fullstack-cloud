import { z } from "zod";

const schema = z.object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(10, 'Content is required'),
    category: z.string().min(3, 'Category is required'),
    author: z.string().min(1, 'Author is required')
})

type FormData = z.infer<typeof schema>;

export { schema };
export type { FormData };