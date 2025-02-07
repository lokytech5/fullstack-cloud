import { z } from "zod";

const schema = z.object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(10, 'Content is required'),
    categories: z.array(z.string().min(3, 'Category name must be at least 3 characters long')),
    author: z.string().min(1, 'Author is required')
})

type FormData = z.infer<typeof schema>;

export { schema };
export type { FormData };