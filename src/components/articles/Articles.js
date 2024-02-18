import { NavLink } from "react-router-dom";
import styles from "./Articles.module.css";
import Article from "./Article";
import UserPanel from "../users/UserPanel";
import { useEffect } from "react";
import { getArticles } from "../actions/articleActions";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { memoizedAuthSelector } from "../auth/Login";
import { useQueryClient } from "@tanstack/react-query";
import { useArticles } from "./useArticles";
import Spinner from "../ui/Spinner";

const articlesSelector = (state) => state.articles;

const memoizedArticlesSelector = createSelector(
  articlesSelector,
  (articles) => articles
);
export default function Articles() {
  const auth = useSelector(memoizedAuthSelector);
  // const articles = useSelector(memoizedArticlesSelector);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   eslint-disable-next-line react-hooks/exhaustive-deps
  //
  //   dispatch(getArticles());
  // }, []);

  //ACCESS QUERY CLIENT

  const { isLoading, articles } = useArticles();

  if (isLoading) return <Spinner />;

  return (
    <div className="articles">
      {auth.isAuth ? (
        <div>
          <UserPanel />
        </div>
      ) : (
        <div className={styles.block1}>
          <h3>
            <NavLink className={styles.decoration} to="/register">
              Register and write new articles!!!
            </NavLink>
          </h3>
        </div>
      )}

      <div className={styles.block2}>
        <NavLink className={styles.decoration} to="/">
          To the main page
        </NavLink>
      </div>
      <div className={styles.block3}>
        {articles?.map((article) => {
          return (
            <Article
              key={article._id}
              text={article.text}
              title={article.title}
              name={article.name}
              userId={article.userId}
              _id={article._id}
              auth={auth}
              articles={articles}
            />
          );
        })}
      </div>
    </div>
  );
}
