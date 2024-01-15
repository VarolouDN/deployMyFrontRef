import styles from "./Auth.module.css";
import { NavLink } from "react-router-dom";
import {useState} from "react";
import {login} from "./actions/authActions";
import {useDispatch,useSelector} from "react-redux";
import {createSelector} from 'reselect'

import {useNavigate} from "react-router";


const authSelector=state=>state.auth

export const memoizedAuthSelector=createSelector(
    authSelector,
    auth=>auth
)
export default function Auth() {
    const dispatch=useDispatch()
    const auth=useSelector(memoizedAuthSelector)
    const navigate=useNavigate()

    console.log('!')
    const[email,setEmail]=useState('')

    const[password,setPassword]=useState('')


   function handleSubmit(e){
        e.preventDefault()
       dispatch(login(email,password,navigate))


    }
 /*if(auth.isAuth){
     return <Navigate to={'/articles'}/>
 }*/
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        <em>Enter Email</em>
      </label>
      <input value={email}  onChange={e=>setEmail(e.target.value)}type="text" />
      <label>
        <em>Enter Password</em>
      </label>
      <input value={password}  onChange={e=>setPassword(e.target.value)} type="password" />
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
