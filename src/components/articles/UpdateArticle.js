import { Navigate, NavLink, useParams } from "react-router-dom";
import styles from "./CreateArticle.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { memoizedAuthSelector } from "../auth/Login";
import { updateArticle } from "../actions/articleActions";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { useArticles } from "./useArticles";
import { useUpdateArticle } from "./useUpdateArticle";
import Spinner from "../ui/Spinner";
import { useArticle } from "./useArticle";

// const authSelector = (state) => state.auth;
//
// const memoizedAuthSelector = createSelector(
//     authSelector,
//     (auth) => auth
// );

// const currentArticleSelector = (state) => state.articles.currentArticle;
//
// export const memoizedCurrentArticleSelector = createSelector(
//   currentArticleSelector,
//   (currentArticle) => currentArticle
// );

export default function UpdateArticle() {
  const { _id: articleId } = useParams();
  const { isLoading, articles } = useArticles();
  const currentArticle = articles?.find((elem) => articleId === elem._id);
  //const { isGettingArticle, currentArticle } = useArticle();

  const { isUpdating, updateArticle } = useUpdateArticle();
  console.log(currentArticle);
  // const currentArticle = useSelector(memoizedCurrentArticleSelector);
  // const navigate = useNavigate();
  const [title, setTitle] = useState(currentArticle?.title || "");
  const [text, setText] = useState(currentArticle?.text || "");
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector(memoizedAuthSelector);

  console.log(title);
  useEffect(() => {
    setIsLoaded(true);
    if (currentArticle?._id) {
      setIsLoaded(false);
    }
  }, [currentArticle]);

  if (!auth.isAuth) {
    return <Navigate to="/" />;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const updatedObj = {
      title,
      name: auth.currentUser.name,
      userId: auth.currentUser.id,
      text,
      _id: currentArticle._id,
    };

    updateArticle({
      ...updatedObj,
      _id: currentArticle._id,
    });
  }
  // if (isGettingArticle || isLoaded) return <Spinner />;
  return (
    <>
      <form className={styles.create} onSubmit={handleSubmit}>
        <h3>
          <NavLink to="/">To the main page</NavLink>
          <br />
          <NavLink to="/articles">To the articles</NavLink>
        </h3>
        <input
          type="text"
          className={styles.input}
          value={/*currentArticle?.title && currentArticle?.title */ title}
          onChange={(e) => setTitle(e.target.value)}
          // disabled={isGettingArticle}
        />
        <input type="file" />
        <textarea
          value={/*currentArticle?.text  && currentArticle?.text*/ text}
          onChange={(e) => setText(e.target.value)}
          className={styles.textarea}
          // disabled={isGettingArticle}
        />
        <button className={styles.btn}>Submit</button>
      </form>
    </>
  );
}
