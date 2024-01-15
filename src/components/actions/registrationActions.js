export function registration(email, name, password, navigate) {
  return async function (dispatch) {
    try {
      const res = await fetch("http://localhost:5000/api/auth/registration", {
        method: "post",
        body: JSON.stringify({
          email: email,
          name: name,
          password: password,
        }),
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();

      alert(data.message);
      navigate("/auth");
    } catch (e) {
      console.log(e);
    }
  };
}
