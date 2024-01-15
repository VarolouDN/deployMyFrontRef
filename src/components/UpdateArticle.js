import { Navigate, NavLink } from "react-router-dom";
import styles from "./CreateArticle.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { memoizedAuthSelector } from "./Auth";
import { updateArticle } from "./actions/articleActions";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { createSelector } from "reselect";

/*const authSelector = (state) => state.auth;

const memoizedAuthSelector = createSelector(
    authSelector,
    (auth) => auth
);
*/
const currentArticleSelector = (state) => state.articles.currentArticle;

export const memoizedCurrentArticleSelector = createSelector(
  currentArticleSelector,
  (currentArticle) => currentArticle
);

export default function UpdateArticle() {
  const currentArticle = useSelector(memoizedCurrentArticleSelector);
  const navigate = useNavigate();
  const [title, setTitle] = useState(currentArticle.title);
  const [text, setText] = useState(currentArticle.text);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector(memoizedAuthSelector);

  console.log(currentArticle);
  useEffect(() => {
    if (Object.keys(currentArticle).length > 0) {
      setIsLoaded(true);
    }
  }, [currentArticle]);

  if (!auth.isAuth) {
    return <Navigate to="/" />;
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      updateArticle(
        title,
        auth.currentUser.name,
        auth.currentUser._id,
        text,
        currentArticle._id,
        navigate
      )
    );
  }

  console.log(currentArticle);
  return (
    <>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <form className={styles.create} onSubmit={handleSubmit}>
          <h3>
            <NavLink to="/">To the main page</NavLink>
          </h3>
          <input
            type="text"
            className={styles.input}
            value={/*currentArticle?.title && currentArticle?.title */ title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            value={/*currentArticle?.text  && currentArticle?.text*/ text}
            onChange={(e) => setText(e.target.value)}
            className={styles.textarea}
          />
          <button className={styles.btn}>Submit</button>
        </form>
      )}
    </>
  );
}
