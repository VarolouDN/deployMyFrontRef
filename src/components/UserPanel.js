import { NavLink } from "react-router-dom";
import styles from "./UserPanel.module.css";

export default function UserPanel() {
  return (
    <div className={styles.panel}>
      <div className={styles.block1}>
        <img src="" alt="avatar" />
      </div>

      <div className={styles.block2}>
        <span>
          <NavLink className={styles.decoration} to="/create">
            Create Article
          </NavLink>
        </span>
      </div>

      <div className={styles.block3}>
        <NavLink className={styles.decoration}>Personal Information</NavLink>
      </div>

      <div className={styles.block4}>
        <NavLink className={styles.decoration}>My Admin</NavLink>
      </div>
    </div>
  );
}
