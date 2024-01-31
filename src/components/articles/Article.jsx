import styles from "./Article.module.css";
import {Navigate, NavLink} from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  deleteArticle,
  getArticles,
  setCurrentArticle,
} from "../actions/articleActions";
import { useNavigate } from "react-router";
import { useState } from "react";
import UpdateArticle from "./UpdateArticle";
import {useArticle} from "./useArticle";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {API_URL, createArticleApi} from "../api/articlesApi";
import {useDeleteArticle} from "./useDeleteArticle";

export default function Article({
  text,
  name,
  title,
  auth,
  userId,
  _id,
  articles,
}) {

  // const[articlesLength,setArticlesLength]=useState(articles.articles.length)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const[isEditing,setIsEditing]=useState(false)
  const {isDeleting,deleteArticle}=useDeleteArticle()
     // const {isLoading,currentArticle}=useQuery({
     //     queryKey: ['articles', _id],
     //     queryFn: async () => {
     //         const response = await fetch(`${API_URL}/articles/${_id}`)
     //         if (!response.ok) {
     //             throw new Error('Network response was not ok')
     //         }
     //         return response.json()
     //     },
     // })

  function articleHandler() {
      setIsEditing(prev=>!isEditing)

      navigate(`/update/${_id}`)
      // dispatch(setCurrentArticle({ name, text, title, userId, _id }));

  }

    // const currentArticle = {name, text, title, userId, _id}
  function articleDeleteHandler() {
    console.log("delete!!!")
      console.log(_id,auth.currentUser.id)
     deleteArticle({_id,userId:auth.currentUser.id})
  }

  return (
    <div className={styles.article}>
      <div className={styles.title}>
        {auth.isAuth && auth.currentUser.id === userId ? (
          <div>
            <NavLink  >

              <span className={styles.blockSpan}>{title}</span>
            </NavLink>
          </div>
        ) : (
          <h2>{title}</h2>
        )}
        <span>Статья автора {name}</span>
      </div>
      <div className={styles.p}>
        <p className={styles.formatText}>{text}</p>
      </div>
      {auth.isAuth && auth.currentUser.id === userId ? (
        <button onClick={articleDeleteHandler}>
          DELETE ARTICLE
        </button>
      ) : (
        <div></div>
      )}
      {auth.isAuth && auth.currentUser.id === userId ? (
        <button onClick={articleHandler}>

          EDIT ARTICLE
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
}
