import { model, Schema } from "mongoose";

interface Article {
    title: string;
    content: string;
    category: string;
    author: string;
}

const articleSchema = new Schema<Article>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    author: { type: String, required: true },
})

const Article = model<Article>('Article', articleSchema)

export default Article;