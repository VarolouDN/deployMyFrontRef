import styles from "./Article.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  deleteArticle,
  getArticles,
  setCurrentArticle,
} from "./actions/articleActions";
import { useNavigate } from "react-router";
import { useState } from "react";

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
  function articleHandler() {
    dispatch(setCurrentArticle({ name, text, title, userId, _id }));
  }
  function articleDeleteHandler() {
    dispatch(setCurrentArticle({ name, text, title, userId, _id }));

    console.log(articles);
    dispatch(deleteArticle(auth.currentUser.id, _id, navigate))
      .then(() => {
        dispatch(getArticles());
      })
      .catch((error) => {
        console.error("Error deleting", error);
      });
  }

  return (
    <div className={styles.article}>
      <div className={styles.title}>
        {auth.isAuth && auth.currentUser.id === userId ? (
          <div>
            <NavLink onClick={articleHandler} to="/update">
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
        <button onClick={articleDeleteHandler}>Delete</button>
      ) : (
        <div></div>
      )}
    </div>
  );
}
