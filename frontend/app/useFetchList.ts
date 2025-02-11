import { useQuery } from "@tanstack/react-query";
import { ArticleListResponse } from "./types";
import { AxiosError } from "axios";
import { apiClient } from "./api-client";

interface ErrorResponse {
    message: string;
    
}

const useFetchList = () => {
    return useQuery<ArticleListResponse[], AxiosError<ErrorResponse>>({
        queryKey: ['getArticles'],
        queryFn: async () => {
            const response = await apiClient.get<ArticleListResponse[]>("/articles/");
            return response.data;
        },
    });
}

export default useFetchList;