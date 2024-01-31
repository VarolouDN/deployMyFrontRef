import {useQuery} from "@tanstack/react-query";
import {getArticle} from "../api/articlesApi";


export function useArticle(_id){

    const{data:currentArticle,isLoading,error}=useQuery({
        queryKey:['articles',_id],
        queryFn:async(_id)=>getArticle(_id)
    })
    return {error,currentArticle,isLoading}
}
