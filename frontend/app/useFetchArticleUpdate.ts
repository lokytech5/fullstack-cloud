import { useMutation } from "@tanstack/react-query";
import { UpdatedArticleData, updateArticleResponse } from "./types";
import { AxiosError } from "axios";
import { apiClient } from "./api-client";

interface ErrorResponse {
    message: string;
}

const useFetchUpdatedArticle = () => {
    return useMutation<updateArticleResponse, AxiosError<ErrorResponse>, UpdatedArticleData>({
        mutationFn: async (updatedArticleData) => {
            const response = await apiClient.put<updateArticleResponse>(
                `/articles/${updatedArticleData._id}`, 
                updatedArticleData, 
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return response.data;
        },
    });
};

export default useFetchUpdatedArticle;
