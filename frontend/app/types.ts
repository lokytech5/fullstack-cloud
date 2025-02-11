export interface ArticleData {
    title: string;
    content: string;
    category: string;
    author: string;
}

export interface UpdatedArticleData extends ArticleData {
    _id: string;
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

export interface ArticleListResponse{
    _id: string;
    title: string;
    content: string;
    category: string;
    author: string;
    __v: number;
}

export interface updateArticleResponse {
    message: string;
    updatedArticle: {
        _id: string;
        title: string;
        content: string;
        category: string;
        author: string;
        __v: number;
    }
}