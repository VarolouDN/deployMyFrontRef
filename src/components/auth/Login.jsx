import styles from "./Login.module.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

import useLogin from "./useLogin";

const authSelector = (state) => state.auth;

export const memoizedAuthSelector = createSelector(
  authSelector,
  (auth) => auth
);
export default function Login() {
  // const dispatch = useDispatch();
  const auth = useSelector(memoizedAuthSelector);
  // const navigate = useNavigate();

  const { isLoading, login } = useLogin();
  const [email, setEmail] = useState("test@ukr.net");

  const [password, setPassword] = useState("1234");

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    // dispatch(login(email, password, navigate));
    const user = { email, password };
    login(user);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        <em>Enter Email</em>
      </label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        disabled={isLoading}
      />
      <label>
        <em>Enter Password</em>
      </label>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        disabled={isLoading}
      />
      <div>
        <em>Not registered yet?</em>
        <NavLink className={styles.decoration} to="/register">
          <em> Click here!</em>
        </NavLink>
      </div>
      <button className={styles.btn} type="submit" value="Submit">
        <em>Submit</em>
      </button>
    </form>
  );
}
