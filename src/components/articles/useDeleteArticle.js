import {useNavigate} from "react-router";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createArticleApi, deleteArticleApi} from "../api/articlesApi";


export function useDeleteArticle(){

    const queryClient=useQueryClient()
    const {isLoading:isDeleting,mutate:deleteArticle}=useMutation({

        mutationFn:({_id,userId})=>deleteArticleApi(_id,userId),
        onSuccess:()=>{
            alert('Article was successfully deleted')
            queryClient.invalidateQueries({
                queryKey:['articles']
            })

        },
        onError:(err)=>{

            alert(err.message)
        }
    })
    return {isDeleting,deleteArticle}
}
