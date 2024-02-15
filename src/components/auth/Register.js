import styles from "./Auth.module.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { registration } from "../actions/registrationActions";
import useSignUp from "./useSignUp";

export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading: isSigningUp, signUp } = useSignUp();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /*   async function  regFunction(){
        try {
            const res = await fetch("http://localhost:5000/api/auth/registration", {
                method: 'post',
                body: JSON.stringify({email:email,name:name ,password:password}),
                headers: {
                    'content-type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000'

                }
            })
            const data=await res.json()

            alert(data.message)
            return data
        }catch(e){
            console.log(e)
        }
    }*/

  async function handleSubmit(e) {
    e.preventDefault();
    const user = { email, name, password };
    // dispatch(registration(email,name,password,navigate))
    signUp(user);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        <em>Choose your Email</em>
      </label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        disabled={isSigningUp}
      />
      <label>
        <em>Choose your Login</em>
      </label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        disabled={isSigningUp}
      />
      <label>
        <em>Choose your Password</em>
      </label>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        disabled={isSigningUp}
      />
      <div>
        <NavLink className={styles.decoration} to="/articles">
          <em> To the Articles without registration!</em>
        </NavLink>
      </div>
      <button className={styles.btn} type="submit" value="Submit">
        <em>Submit</em>
      </button>
    </form>
  );
}
