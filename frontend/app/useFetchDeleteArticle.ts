import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { apiClient } from "./api-client";

interface ErrorResponse {
    message: string;
}

const useFetchDeleteArticle = () => {
    return useMutation<void, AxiosError<ErrorResponse>, string>({
        mutationFn: async (id) => {
            await apiClient.delete(`/articles/${id}`);
        },
    });
};

export default useFetchDeleteArticle;
