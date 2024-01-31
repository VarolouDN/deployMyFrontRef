import {useQuery} from "@tanstack/react-query";
import {getArticles} from "../api/articlesApi";


export function useArticles(){

    const{data:articles,isLoading,error}=useQuery({
        queryKey:['articles'],
        queryFn:getArticles
    })
    return {error,articles,isLoading}
}
