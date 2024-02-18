export const setCurrentUserActionCreator = (payload) => {
  return {
    type: "SET_CURRENT",
    payload,
  };
};
export const setAuthActionCreator = () => {
  return {
    type: "SET_AUTH",
  };
};
export const logout = () => {
  return {
    type: "LOG_OUT",
  };
};
export function login(email, password, navigate) {
  return async (dispatch) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "post",
        body: JSON.stringify({ email: email, password: password }),
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();

      if (data.success) {
        dispatch(setCurrentUserActionCreator(data.user));
        // dispatch(setAuthActionCreator())
        console.log(data);
        localStorage.setItem("token", data.token);
        console.log(localStorage.getItem("token"));
        navigate("/articles");
      } else alert(data.message);
    } catch (e) {
      console.log(e.message);
    }
  };
}

/*export function auth() {

    return  async(dispatch)=> {
        try {
            const res = await fetch("http://localhost:5000/api/auth/auth", {
                method: 'get',
              //  body: JSON.stringify({email: email, password: password}),
                headers: {
                    'content-type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                     'Authorization':`Bearer ${localStorage.getItem('token')}`
                }
            })
            const data = await res.json()
            dispatch(setCurrentUserActionCreator(data.user))
         //   dispatch(setAuthActionCreator())
            console.log(data)
            localStorage.setItem('token',data.token)


        } catch (e) {
            console.log(e.message)
            localStorage.removeItem('token')
        }
    }
}*/
export function authCheck() {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found in localStorage");
        return;
      }

      console.log("Token found in localStorage:", token);

      const res = await fetch("http://localhost:5000/api/auth/auth", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        console.log("Unauthorized - token is invalid or expired");
        localStorage.removeItem("token");
        return;
      }

      const data = await res.json();
      console.log("Login response data:", data);

      dispatch(setCurrentUserActionCreator(data.user));
      localStorage.setItem("token", data.token);
    } catch (e) {
      console.log("Error during auth:", e.message);
    }
  };
}
