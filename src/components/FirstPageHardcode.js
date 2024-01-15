import "../App.css";
import styles from "./FirstPageHardcore.module.css";
import { NavLink } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {memoizedAuthSelector} from "./Auth";
import {logout} from "./actions/authActions";

export default function FirstPageHardcode() {

    function logoutHandler(){

        dispatch(logout())
    }
    const auth=useSelector(memoizedAuthSelector)
    const dispatch=useDispatch()
  return (
    <div className={styles.first}>
      <div className={styles.block1}>
        <h1>Welcome to the Live Articles!!!</h1>
      </div>
      <div className={styles.block2}>{auth.isAuth?
          <NavLink className={styles.decoration} to="/auth" onClick={logoutHandler}>
          <h4>
          <em>Log out!</em>
          </h4>
          </NavLink>:
        <NavLink className={styles.decoration} to="/auth">
          <h4>
            <em>Log in!</em>
          </h4>
        </NavLink>
      }
      </div>
      <div className={styles.block3}>
        <NavLink className={styles.decoration} to="/articles">
          <h4>
            <em>To the Articles!</em>
          </h4>
        </NavLink>
      </div>
    </div>
  );
}
