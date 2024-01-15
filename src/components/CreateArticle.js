import { Navigate, NavLink } from "react-router-dom";
import styles from "./CreateArticle.module.css";
import { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { memoizedAuthSelector } from "./Auth";
import { createArticle } from "./actions/articleActions";
import {useNavigate} from "react-router";
export default function CreateArticle() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isCreated, setIsCreated] = useState(false);
   const dispatch=useDispatch()
  const navigate=useNavigate()
  const auth = useSelector(memoizedAuthSelector);
  if (!auth.isAuth) {
    return <Navigate to="/" />;
  }


  async function handleSubmit(e) {
    e.preventDefault();

    dispatch(
      createArticle(title, auth.currentUser.name, auth.currentUser.id, text,navigate)
    );
    /* const newArticle = await createArticle();
    if (!newArticle?.errors) {
      setTitle("");
      setText("");
      alert("Article was created");
      setIsCreated(true);*/
  }

  return (
    <>
      {isCreated ? (
        <Navigate to="/articles" />
      ) : (
        <form className={styles.create} onSubmit={handleSubmit}>
          <h3>
            <NavLink to="/">To the main page</NavLink>
          </h3>
          <input
            type="text"
            placeholder="Choose the tittle"
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your text"
            className={styles.textarea}
          />
          <button className={styles.btn}>Submit</button>
        </form>
      )}
    </>
  );
}
