import { useQuery } from "@tanstack/react-query";
import { getArticleApi } from "../api/articlesApi";
import { useParams } from "react-router-dom";
export function useArticle() {
  const { _id: articleId } = useParams();
  const {
    data: currentArticle,
    isLoading: isGettingArticle,
    error,
  } = useQuery({
    queryKey: ["articles", articleId],
    queryFn: () => getArticleApi(articleId),
    retry: false,
  });
  return { error, currentArticle, isGettingArticle };
}
