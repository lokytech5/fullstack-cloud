import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { ArticleData, ArticleResponse } from "./types";
import { apiClient } from "./api-client";

interface ErrorResponse {
    error?: string;
    message?: string;
}

const useFetchArticle = () => {
    return useMutation<ArticleResponse, AxiosError<ErrorResponse>, ArticleData>({
        mutationFn: async (articleData) => {
            const response = await apiClient.post<ArticleResponse>("/articles/", articleData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        },
        onSuccess: (data: ArticleResponse) => {
            console.log("Article successfully uploaded:", data);
        },
        onError: (error: AxiosError<ErrorResponse>) => {
            console.error("Error uploading article:", error.message);
        },
    });
};

export default useFetchArticle;
