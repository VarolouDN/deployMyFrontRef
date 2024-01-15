import "./App.css";
import FirstPageHardcode from "./components/FirstPageHardcode";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Articles from "./components/Articles";
import Auth, { memoizedAuthSelector } from "./components/Auth";
import Register from "./components/Register";
import CreateArticle from "./components/CreateArticle";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authCheck } from "./components/actions/authActions";
import { getArticles } from "./components/actions/articleActions";
import UpdateArticle from "./components/UpdateArticle";
function App() {
  const dispatch = useDispatch();
  const auth = useSelector(memoizedAuthSelector);
  useEffect(() => {
    //  if(localStorage.getItem('token')){
    if (!auth.isAuth) {
      dispatch(authCheck());
    }

    // }
  }, []);
  console.log('!')

  //Added one route to Update
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FirstPageHardcode />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreateArticle />} />
          <Route path="/update" element={<UpdateArticle />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
