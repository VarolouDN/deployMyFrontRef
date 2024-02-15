import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createArticleApi } from "../api/articlesApi";
import { useNavigate } from "react-router";

export function useCreateArticle() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: createArticle } = useMutation({
    mutationFn: (article) => createArticleApi(article),
    onSuccess: () => {
      alert("Article was created");
      queryClient.invalidateQueries({
        queryKey: ["articles"],
      });
      navigate("/articles");
    },
    onError: (err) => {
      alert(err.message);
    },
  });
  return { isCreating, createArticle };
}
