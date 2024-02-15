import { Navigate, NavLink } from "react-router-dom";
import styles from "./CreateArticle.module.css";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { memoizedAuthSelector } from "../auth/Auth";

import { useCreateArticle } from "./useCreateArticle";

export default function CreateArticle() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState("");
  const [isCreated, setIsCreated] = useState(false);
  const { isCreating, createArticle } = useCreateArticle();
  const dispatch = useDispatch();
  const fileRef = useRef();

  const auth = useSelector(memoizedAuthSelector);
  if (!auth.isAuth) {
    return <Navigate to="/" />;
  }

  const fileHandleChange = (e) => {
    console.log("file");
    const file = e.target.files[0];

    setFile(file);
    console.log(file);
  };

  function handleSubmit(e) {
    e.preventDefault();
    //  console.log(title,text)
    // const formData = new FormData();
    // formData.append('file', file);

    // const newArticle={title,name: auth.currentUser.name, userId:auth.currentUser.id, text}
    //    formData.append('newArticle',JSON.stringify(newArticle))

    //   createArticle(formData)

    const newArticle = {
      title,
      name: auth.currentUser.name,
      userId: auth.currentUser.id,
      text,
    };
    console.log(newArticle);
    createArticle(newArticle);
  }

  return (
    <>
      {/*{isCreated ? (*/}
      {/*  <Navigate to="/articles" />*/}
      {/*) : (*/}
      <form className={styles.create} onSubmit={handleSubmit}>
        <h3>
          <NavLink to="/">To the main page</NavLink>
          <br />
          <NavLink to="/articles">To the articles</NavLink>
        </h3>

        <input
          type="text"
          placeholder="Choose the tittle"
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div>
          <input type="file" ref={fileRef} onChange={fileHandleChange} />
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text"
          className={styles.textarea}
        />

        <button className={styles.btn}>Submit</button>
      </form>
      {/*)*/}
    </>
  );
}
