import {useNavigate} from "react-router";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createArticleApi, updateArticleApi} from "../api/articlesApi";

export function useUpdateArticle(){
    const navigate=useNavigate()
    const queryClient=useQueryClient()
    const {isLoading:isUpdating,mutate:updateArticle}=useMutation({

        mutationFn:({updatedObj,_id})=>updateArticleApi(updatedObj,_id),
        onSuccess:()=>{
            alert('Article was updated')
            queryClient.invalidateQueries({
                queryKey:['articles']
            })
            navigate('/articles')
        },
        onError:(err)=>{

            alert(err.message)
        }
    })
    return {isUpdating,updateArticle}
}
