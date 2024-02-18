export const API_URL_AUTH = "http://localhost:5000/api/auth";

export async function signUpApi(user) {
  try {
    const res = await fetch(`${API_URL_AUTH}/registration`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "content-type": "application/json",
      },
    });
    console.log(data);
    const { data, error } = res.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function loginApi(user) {
  try {
    const res = await fetch(`${API_URL_AUTH}/login`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await res.json();
    console.log("login");
    console.log(data);

    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export function logoutApi() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}
