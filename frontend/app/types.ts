export interface ArticleData {
    title: string;
    content: string;
    category: string;
    author: string;
}


export interface ArticleResponse {
    message: string;
    article: {
        title: string;
        content: string;
        category: string;
        author: string;
        _id: string;
        __v: number
    }
}