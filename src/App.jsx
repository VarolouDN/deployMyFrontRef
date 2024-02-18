import "./App.css";
import FirstPageHardcode from "./components/firstpage/FirstPageHardcode";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Articles from "./components/articles/Articles";
import Login, { memoizedAuthSelector } from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import CreateArticle from "./components/articles/CreateArticle";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authCheck } from "./components/actions/authActions";
import { getArticles } from "./components/actions/articleActions";
import UpdateArticle from "./components/articles/UpdateArticle";
import {QueryClient} from "@tanstack/react-query";
import {QueryClientProvider} from "@tanstack/react-query";


const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      // staleTime:60*1000
      staleTime:0
    }
  }
})


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
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false}/>
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route /*path="/" */ index element={<FirstPageHardcode />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/auth" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/create" element={<CreateArticle />} />
          <Route path="/update/:_id" element={<UpdateArticle />} />
        </Routes>
      </BrowserRouter>
    </div>
      </QueryClientProvider>
  );
}

export default App;
