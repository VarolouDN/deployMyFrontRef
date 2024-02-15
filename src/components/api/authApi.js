export const API_URL_AUTH = "http://localhost:5000/api/auth";

export default function signUpApi(user) {
  try {
    const res = fetch(`${API_URL_AUTH}/registration`, {
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
