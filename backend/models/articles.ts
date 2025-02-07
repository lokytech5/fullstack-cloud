import { model, Schema } from "mongoose";

interface Article {
    title: string;
    content: string;
    categories: string | string[];
    author: string;
}

const articleSchema = new Schema<Article>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    categories: { type: [String], required: true },
    author: { type: String, required: true },
})

const Article = model<Article>('Article', articleSchema)

export default Article;